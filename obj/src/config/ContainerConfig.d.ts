/** @module config */
import { ConfigParams } from 'pip-services-commons-node';
import { ComponentConfig } from './ComponentConfig';
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
export declare class ContainerConfig extends Array<ComponentConfig> {
    /**
     * Creates a new ContainerConfig object. Can be initialized with an array
     * of [[ComponentConfig ComponentConfigs]] (if given).
     *
     * @param components    (optional) the array of [[ComponentConfig ComponentConfigs]] to
     *                      initialize this ContainerConfig with.
     */
    constructor(components?: ComponentConfig[]);
    /**
     * Static method that converts a value into a ContainerConfig object.
     *
     * @param value     the value to convert.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html#fromvalue ConfigParams.fromValue]] (in the PipServices "Commons" package)
     * @see [[fromConfig]]
     */
    static fromValue(value: any): ContainerConfig;
    /**
     * Static method that converts ConfigParams into a ContainerConfig object.
     *
     * @param config    the ConfigParams to convert.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[ComponentConfig.fromConfig]]
     */
    static fromConfig(config: ConfigParams): ContainerConfig;
}
