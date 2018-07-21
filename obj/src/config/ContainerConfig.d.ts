import { ConfigParams } from 'pip-services-commons-node';
import { ComponentConfig } from './ComponentConfig';
export declare class ContainerConfig extends Array<ComponentConfig> {
    constructor(components?: ComponentConfig[]);
    static fromValue(value: any): ContainerConfig;
    static fromConfig(config: ConfigParams): ContainerConfig;
}
