import { ContainerConfig } from '../config/ContainerConfig';
import { ManagedReferences } from './ManagedReferences';
/**
 * Stores a container's complete set of references.
 *
 * @see [[ManagedReferences]]
 */
export declare class ContainerReferences extends ManagedReferences {
    /**
     * Adds [[ComponentConfig component configurations]] to this ContainerReferences object.
     *
     * For each [[ComponentConfig component configuration]] in the passed [[ContainerConfig container configuration]]
     * the following is done:
     *
     * * References are set:
     *     * if the ComponentConfig contains a "type" - an attempt will be made to create the component
     *     dynamically.
     *     * otherwise, if the ComponentConfig contains a "descriptor" - an attempt will be made to create
     *     the component using the stored locator-[[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]].
     *     * if the component was successfully created - it is added to this object's list of references.
     * * The component is setup:
     *     * if the component [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html is configurable]] -
     *     it will be configured using the ComponentConfig's "config".
     *     * if the component [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html can reference]]
     *     other components (factories) - it will be set to reference this ContainerReferences object.
     *
     * @see [[ContainerConfig]]
     * @see [[ComponentConfig]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html IReferenceable]] (in the PipServices "Commons" package)
     *
     * @param config    the ContainerConfig, whose [[ComponentConfig ComponentConfigs]] are to be added.
     *
     *
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/build.createexception.html CreateException]]
     *          if the component cannot be created using one of the ContainerConfig's ComponentConfig's
     *          (explicit) "type" or "descriptor" (locator).
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referenceexception.html ReferenceException]]
     *          if an object cannot be created by one of the ContainerConfig's ComponentConfig's descriptor
     *          (locator).
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referenceexception.html ReferenceException]]
     *          if any other exception is raised.
     */
    putFromConfig(config: ContainerConfig): void;
}
