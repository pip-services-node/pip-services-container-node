"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
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
class ComponentConfig {
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
    constructor(descriptor, type, config) {
        this.descriptor = null;
        this.type = null;
        this.config = null;
        this.descriptor = descriptor;
        this.type = type;
        this.config = config;
    }
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
    static fromConfig(config) {
        var descriptor = pip_services_commons_node_1.Descriptor.fromString(config.getAsNullableString("descriptor"));
        var type = pip_services_commons_node_2.TypeDescriptor.fromString(config.getAsNullableString("type"));
        if (descriptor == null && type == null)
            throw new pip_services_commons_node_3.ConfigException(null, "BAD_CONFIG", "Component configuration must have descriptor or type");
        return new ComponentConfig(descriptor, type, config);
    }
}
exports.ComponentConfig = ComponentConfig;
//# sourceMappingURL=ComponentConfig.js.map