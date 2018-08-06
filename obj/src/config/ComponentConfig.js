"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
class ComponentConfig {
    constructor(descriptor, type, config) {
        this.descriptor = null;
        this.type = null;
        this.config = null;
        this.descriptor = descriptor;
        this.type = type;
        this.config = config;
    }
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