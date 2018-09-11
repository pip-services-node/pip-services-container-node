import { IOpenable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IUnreferenceable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { ILogger, IFactory } from 'pip-services-components-node';
import { ContextInfo } from 'pip-services-components-node';
import { DefaultContainerFactory } from './build/DefaultContainerFactory';
import { ContainerConfig } from './config/ContainerConfig';
import { ContainerReferences } from './refer/ContainerReferences';
/**
 * Inversion of control (IoC) container, which creates objects
 * and controls their lifecycle using various configurations.
 *
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html IReferenceable]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/run.iopenable.html IOpenable]] (in the PipServices "Commons" package)
 */
export declare class Container implements IConfigurable, IReferenceable, IUnreferenceable, IOpenable {
    protected _logger: ILogger;
    protected _factories: DefaultContainerFactory;
    protected _info: ContextInfo;
    protected _config: ContainerConfig;
    protected _references: ContainerReferences;
    /**
     * Creates a new Container.
     *
     * @param name          (optional) the name of the container (used as context info).
     * @param description   (optional) the container's description (used as context info).
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/info.contextinfo.html ContextInfo]] (in the PipServices "Components" package)
     */
    constructor(name?: string, description?: string);
    /**
     * Creates a [[ContainerConfig]] from the passed ConfigParams, which is used to
     * configure the components of this container.
     *
     * @param config    the ConfigParams to configure the container with.
     *
     * @see [[ContainerConfig.fromConfig]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    configure(config: ConfigParams): void;
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
    readConfigFromFile(correlationId: string, path: string, parameters: ConfigParams): void;
    /**
     * Method that should be overriden in child classes (child containers). Should set component
     * references for the child containers' components.
     *
     * @param references    not used.
     */
    setReferences(references: IReferences): void;
    /**
     * Method that should be overriden in child classes (child containers). Should unset the child
     * containers' component references.
     */
    unsetReferences(): void;
    private initReferences;
    /**
     * Adds a factory to the container. The factory is used to create components
     * added to the container by their locators (descriptors).
     *
     * @param factory a component factory to be added.
     */
    addFactory(factory: IFactory): void;
    /**
     * @returns whether or not any references have been set in this container.
     */
    isOpen(): boolean;
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
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/info.contextinfo.html ContextInfo]] (in the PipServices "Components" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]] (in the PipServices "Commons" package)
     */
    open(correlationId: string, callback?: (err: any) => void): void;
    /**
     * Stops the container by [[unsetReferences unsetting references for child containers]] and closing (+ dereferencing)
     * the container's components.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the closing process is complete.
     *                          It will be called with an error if one is raised.
     */
    close(correlationId: string, callback?: (err: any) => void): void;
}
