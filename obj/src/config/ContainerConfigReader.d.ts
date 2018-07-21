import { ConfigParams } from 'pip-services-commons-node';
import { ContainerConfig } from './ContainerConfig';
export declare class ContainerConfigReader {
    static readFromFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig;
    static readFromJsonFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig;
    static readFromYamlFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig;
}
