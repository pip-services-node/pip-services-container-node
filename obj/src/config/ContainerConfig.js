"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ComponentConfig_1 = require("./ComponentConfig");
/**
 * A ContainerConfig object consists of an array of [[ComponentConfig ComponentConfigs]],
 * which can be used to configure the components that are running inside a given container.
 *
 * @see [[ComponentConfig]]
 *
 * ### EXamples ###
 *
 *     public MyMethod(config: ConfigParams, value: any) {
 *         let containerConfig1 = ContainerConfig.fromValue(value);
 *         ...
 *         let containerConfig2 = ContainerConfig.fromConfig(config);
 *         ...
 *     }
 */
class ContainerConfig extends Array {
    /**
     * Creates a new ContainerConfig object. Can be initialized with an array
     * of [[ComponentConfig ComponentConfigs]] (if given).
     *
     * @param components    (optional) the array of [[ComponentConfig ComponentConfigs]] to
     *                      initialize this ContainerConfig with.
     */
    constructor(components) {
        super();
        if (components != null)
            super.push(...components);
    }
    /**
     * Static method that converts a value into a ContainerConfig object.
     *
     * @param value     the value to convert.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html#fromvalue ConfigParams.fromValue]] (in the PipServices "Commons" package)
     * @see [[fromConfig]]
     */
    static fromValue(value) {
        let config = pip_services_commons_node_1.ConfigParams.fromValue(value);
        return ContainerConfig.fromConfig(config);
    }
    /**
     * Static method that converts ConfigParams into a ContainerConfig object.
     *
     * @param config    the ConfigParams to convert.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[ComponentConfig.fromConfig]]
     */
    static fromConfig(config) {
        let result = new ContainerConfig();
        if (config == null)
            return result;
        let names = config.getSectionNames();
        for (var i = 0; i < names.length; i++) {
            let componentConfig = config.getSection(names[i]);
            result.push(ComponentConfig_1.ComponentConfig.fromConfig(componentConfig));
        }
        return result;
    }
}
exports.ContainerConfig = ContainerConfig;
//# sourceMappingURL=ContainerConfig.js.map