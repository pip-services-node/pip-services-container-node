/** @module config */
import { Descriptor } from 'pip-services-commons-node';
import { TypeDescriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
export declare class ComponentConfig {
    constructor(descriptor?: Descriptor, type?: TypeDescriptor, config?: ConfigParams);
    descriptor: Descriptor;
    type: TypeDescriptor;
    config: ConfigParams;
    static fromConfig(config: ConfigParams): ComponentConfig;
}
