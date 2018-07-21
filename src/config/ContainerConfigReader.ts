import { JsonConfigReader } from 'pip-services-components-node';
import { YamlConfigReader } from 'pip-services-components-node';
import { ConfigException } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';

import { ContainerConfig } from './ContainerConfig';

export class ContainerConfigReader {

    public static readFromFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig {
        if (path == null)
            throw new ConfigException(correlationId, "NO_PATH", "Missing config file path");

        let ext = path.split('.').pop();

        if (ext == "json")
            return ContainerConfigReader.readFromJsonFile(correlationId, path, parameters);

        if (ext == "yaml" || ext == "yml")
            return ContainerConfigReader.readFromYamlFile(correlationId, path, parameters);

        // By default read as JSON
        return ContainerConfigReader.readFromJsonFile(correlationId, path, parameters);
    }

    public static readFromJsonFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig {
        let config = JsonConfigReader.readConfig(correlationId, path, parameters);
        return ContainerConfig.fromConfig(config);
    }

    public static readFromYamlFile(correlationId: string, path: string, parameters: ConfigParams): ContainerConfig {
        let config = YamlConfigReader.readConfig(correlationId, path, parameters);
        return ContainerConfig.fromConfig(config);
    }
		
}