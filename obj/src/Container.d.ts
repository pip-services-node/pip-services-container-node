import { IOpenable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IUnreferenceable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { ILogger } from 'pip-services-components-node';
import { ContextInfo } from 'pip-services-components-node';
import { DefaultContainerFactory } from './build/DefaultContainerFactory';
import { ContainerConfig } from './config/ContainerConfig';
import { ContainerReferences } from './refer/ContainerReferences';
export declare class Container implements IConfigurable, IReferenceable, IUnreferenceable, IOpenable {
    protected _logger: ILogger;
    protected _factories: DefaultContainerFactory;
    protected _info: ContextInfo;
    protected _config: ContainerConfig;
    protected _references: ContainerReferences;
    constructor(name?: string, description?: string);
    configure(config: ConfigParams): void;
    readConfigFromFile(correlationId: string, path: string, parameters: ConfigParams): void;
    setReferences(references: IReferences): void;
    unsetReferences(): void;
    private initReferences(references);
    isOpened(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
}
