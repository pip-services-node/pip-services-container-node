/** @module core */
import { Descriptor } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IUnreferenceable } from 'pip-services-commons-node';
import { InvalidStateException } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';

import { ILogger } from 'pip-services-components-node';
import { NullLogger } from 'pip-services-components-node';
import { CompositeLogger } from 'pip-services-components-node';
import { ContextInfo } from 'pip-services-components-node';
import { DefaultInfoFactory } from 'pip-services-components-node';

import { DefaultContainerFactory } from './build/DefaultContainerFactory';
import { ContainerConfig } from './config/ContainerConfig';
import { ContainerConfigReader } from './config/ContainerConfigReader';
import { ContainerReferences } from './refer/ContainerReferences';

export class Container implements IConfigurable, IReferenceable, IUnreferenceable, IOpenable {
    protected _logger: ILogger = new NullLogger();
    protected _factories: DefaultContainerFactory = new DefaultContainerFactory();
    protected _info: ContextInfo;
    protected _config: ContainerConfig;
    protected _references: ContainerReferences;

    public constructor(name?: string, description?: string) {
        // Override in child classes
        this._info = new ContextInfo(name, description);
    }

    public configure(config: ConfigParams): void {
        this._config = ContainerConfig.fromConfig(config);
    }

    public readConfigFromFile(correlationId: string, path: string, parameters: ConfigParams): void {
        this._config = ContainerConfigReader.readFromFile(correlationId, path, parameters);
        this._logger.trace(correlationId, this._config.toString());
    }

	public setReferences(references: IReferences): void { 
        // Override in child classes
    }

    public unsetReferences(): void {
        // Override in child classes
    }

    private initReferences(references: IReferences): void {
        let existingInfo = references.getOneOptional<ContextInfo>(DefaultInfoFactory.ContextInfoDescriptor);
        if (existingInfo == null)
            references.put(DefaultInfoFactory.ContextInfoDescriptor, this._info);
        else this._info = existingInfo;
        
        references.put(DefaultContainerFactory.Descriptor, this._factories);
    }

    public isOpen(): boolean {
        return this._references != null;
    }

    public open(correlationId: string, callback?: (err: any) => void): void {
        if (this._references != null) {
            var err = new InvalidStateException(correlationId, "ALREADY_OPENED", "Container was already opened");
            if (callback) callback(err);
            else throw err;
            return;
        }

        try {
            this._logger.trace(correlationId, "Starting container.");

            // Create references with configured components
            this._references = new ContainerReferences();
            this.initReferences(this._references);
            this._references.putFromConfig(this._config);
            this.setReferences(this._references);

            // Get custom description if available
            let infoDescriptor = new Descriptor("*", "context-info", "*", "*", "*");
            this._info = this._references.getOneOptional<ContextInfo>(infoDescriptor);

            this._references.open(correlationId, (err) => {
                // Get reference to logger
                this._logger = new CompositeLogger(this._references);
                this._logger.info(correlationId, "Container %s started.", this._info.name);

                if (err) {
                    this._logger.fatal(correlationId, err, "Failed to start container");
                    this.close(correlationId, callback);
                } else {
                    if (callback) callback(null);
                }
            });
        } catch (ex) {
            this._logger.fatal(correlationId, ex, "Failed to start container");

            this.close(correlationId, (err) => {
                if (callback) callback(ex);
                else throw ex;
            });
        }
    }
		
    public close(correlationId: string, callback?: (err: any) => void): void {
        // Skip if container wasn't opened
        if (this._references == null) {
            if (callback) callback(null);
            return;
        }

        try {
            this._logger.trace(correlationId, "Stopping %s container", this._info.name);

            // Unset references for child container
            this.unsetReferences();

            // Close and deference components
            this._references.close(correlationId, (err) => {
                this._references = null;
                this._logger.info(correlationId, "Container %s stopped", this._info.name);
                if (callback) callback(null);
            });

        } catch (ex) {
            this._logger.error(correlationId, ex, "Failed to stop container");
            if (callback) callback(ex);
            else throw ex;
        }
    }
}
