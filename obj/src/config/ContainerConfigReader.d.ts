import { ConfigParams } from 'pip-services-commons-node';
import { ContainerConfig } from './ContainerConfig';
/**
 * Helper class that contains static methods for reading [[ContainerConfig container configurations]] from
 * JSON and YAML files.
 *
 * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/config.jsonconfigreader.html JsonConfigReader]] (in the PipServices "Components" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/config.yamlconfigreader.html YamlConfigReader]] (in the PipServices "Components" package)
 *
 * ### Examples ###
 *
 *     public MyMethod(parameters: ConfigParams, path: string) {
 *         let containerConfig1 = ContainerConfigReader.readFromFile(null, path, parameters);
 *         ...
 *         let containerConfig2 = ContainerConfigReader.readFromJsonFile(null, path,
 *             parameters);
 *         ...
 *         let containerConfig3 = ContainerConfigReader.readFromYamlFile(null, path,
 *             parameters);
 *         ...
 *     }
 */
export declare class ContainerConfigReader {
    /**
     * Static method that reads the JSON/YAML data from the file and returns it as a parameterized
     * [[ContainerConfig]] object. If the target file's extention is not ".json", ".yaml", or ".yml",
     * then the reader will default to using the [[readFromJsonFile]] method.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              the path to the target file, containing configuration parameters.
     *                          Must not be <code>null</code>.
     * @param parameters        used to parameterize the ConfigReader.
     *
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.configexception.html ConfigException]]
     *          if the path is <code>null</code>.
     *
     * @see [[readFromJsonFile]]
     * @see [[readFromYamlFile]]
     */
    static readFromFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig;
    /**
     * Static method that reads the JSON data from the file and returns it as a parameterized [[ContainerConfig]]
     * object.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              the path to the target file, containing configuration parameters in JSON format.
     * @param parameters        used to parameterize the JsonConfigReader.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/config.jsonconfigreader.html#readconfig JsonConfigReader.readConfig]] (in the PipServices "Components" package)
     * @see [[ContainerConfig.fromConfig]]
     */
    static readFromJsonFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig;
    /**
     * Static method that reads the YAML data from the file and returns it as a parameterized [[ContainerConfig]]
     * object.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              the path to the target file, containing configuration parameters in YAML format.
     * @param parameters        used to parameterize the YamlConfigReader.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/config.yamlconfigreader.html#readconfig YamlConfigReader.readConfig]] (in the PipServices "Components" package)
     * @see [[ContainerConfig.fromConfig]]
     */
    static readFromYamlFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig;
}
