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

/**
 * Inversion of control (IoC) container, which creates objects 
 * and controls their lifecycle using various configurations. 
 * 
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html IReferenceable]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/run.iopenable.html IOpenable]] (in the PipServices "Commons" package)
 */
export class Container implements IConfigurable, IReferenceable, IUnreferenceable, IOpenable {
    protected _logger: ILogger = new NullLogger();
    protected _factories: DefaultContainerFactory = new DefaultContainerFactory();
    protected _info: ContextInfo;
    protected _config: ContainerConfig;
    protected _references: ContainerReferences;

    /**
     * Creates a new Container.
     * 
     * @param name          (optional) the name of the container (used as context info).
     * @param description   (optional) the container's description (used as context info).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/info.contextinfo.html ContextInfo]] (in the PipServices "Components" Package)
     */
    public constructor(name?: string, description?: string) {
        // Override in child classes
        this._info = new ContextInfo(name, description);
    }

    /**
     * Creates a [[ContainerConfig]] from the passed ConfigParams, which is used to 
     * configure the components of this container.
     * 
     * @param config    the ConfigParams to configure the container with.
     * 
     * @see [[ContainerConfig.fromConfig]] 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    public configure(config: ConfigParams): void {
        this._config = ContainerConfig.fromConfig(config);
    }

    /**
     * Reads JSON/YAML data from the target file to this container's [[ContainerConfig]].
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              the path to the target file, containing configuration parameters. 
     *                          Must not be <code>null</code>.
     * @param parameters        used to parameterize the ConfigReader.
     * 
     * @see [[ContainerConfigReader.readFromFile]]
     */
    public readConfigFromFile(correlationId: string, path: string, parameters: ConfigParams): void {
        this._config = ContainerConfigReader.readFromFile(correlationId, path, parameters);
        this._logger.trace(correlationId, this._config.toString());
    }

    /**
     * Method that should be overriden in child classes (child containers). Should set component 
     * references for the child containers' components.
     * 
     * @param references    not used.
     */
	public setReferences(references: IReferences): void { 
        // Override in child classes
    }

    /**
     * Method that should be overriden in child classes (child containers). Should unset the child 
     * containers' component references.
     */
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

    /**
     * @returns whether or not any references have been set in this container.
     */
    public isOpen(): boolean {
        return this._references != null;
    }

    /**
     * Starts the container by setting references to components (in accordance with the container's configuration), 
     * [[setReferences setting child containers' references]], and opening all referenced components.
     * 
     * If a custom "context-info" Descriptor is present in the set references, it will also be set.
     * 
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the opening process is complete. 
     *                          It will be called with an error if one is raised. If omitted, errors 
     *                          will be thrown by this method.
     * 
     * @throws an [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.invalidstateexception.html InvalidStateException]]
     *          if the container has already been opened (references are set).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/info.contextinfo.html ContextInfo]] (in the PipServices "Components" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]] (in the PipServices "Commons" Package)
     */
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
        
    /**
     * Stops the container by [[unsetReferences unsetting references for child containers]] and closing (+ dereferencing) 
     * the container's components. 
     * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the closing process is complete. 
     *                          It will be called with an error if one is raised.
     */
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

            // Close and dereference components
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
