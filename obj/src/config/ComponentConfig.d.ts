/** @module config */
import { Descriptor } from 'pip-services-commons-node';
import { TypeDescriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
/**
 * Stores configuration parameters for components of a given description or type.
 *
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/reflect.typedescriptor.html TypeDescriptor]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
 *
 * ### Examples ###
 *
 *     public MyMethod(config: ConfigParams) {
 *         let componentConfig = ComponentConfig.fromConfig(config);
 *         ...
 *     }
 *
 */
export declare class ComponentConfig {
    /**
     * Creates a new ComponentConfig object. Can be configured with a Descriptor
     * or TypeDescriptor and a set of ConfigParams (if a pair of them are given).
     *
     * @param descriptor    (optional) the component's Descriptor.
     * @param type          (optional) the component's TypeDescriptor.
     * @param config        (optional) the ConfigParams to store.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/reflect.typedescriptor.html TypeDescriptor]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    constructor(descriptor?: Descriptor, type?: TypeDescriptor, config?: ConfigParams);
    descriptor: Descriptor;
    type: TypeDescriptor;
    config: ConfigParams;
    /**
     * Static method that converts ConfigParams into a ContainerConfig object. The ConfigParams
     * that are passed need to contain a "descriptor" or "type", by which the ContainerConfig
     * can be identified.
     *
     * @param config    the ConfigParams to convert. Must contain a "descriptor" or "type".
     * @returns the generated ComponentConfig object.
     *
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.configexception.html ConfigException]]
     *          if no "descriptor" or "type" are found in the given ConfigParams.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html#getasnullablestring ConfigParams.getAsNullableString]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html#fromstring Descriptor.fromString]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/reflect.typedescriptor.html#fromstring TypeDescriptor.fromString]] (in the PipServices "Commons" package)
     * @see [[constructor]]
     */
    static fromConfig(config: ConfigParams): ComponentConfig;
}
