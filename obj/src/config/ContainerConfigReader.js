"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_components_node_2 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ContainerConfig_1 = require("./ContainerConfig");
class ContainerConfigReader {
    static readFromFile(correlationId, path, parameters) {
        if (path == null)
            throw new pip_services_commons_node_1.ConfigException(correlationId, "NO_PATH", "Missing config file path");
        let ext = path.split('.').pop();
        if (ext == "json")
            return ContainerConfigReader.readFromJsonFile(correlationId, path, parameters);
        if (ext == "yaml" || ext == "yml")
            return ContainerConfigReader.readFromYamlFile(correlationId, path, parameters);
        // By default read as JSON
        return ContainerConfigReader.readFromJsonFile(correlationId, path, parameters);
    }
    static readFromJsonFile(correlationId, path, parameters) {
        let config = pip_services_components_node_1.JsonConfigReader.readConfig(correlationId, path, parameters);
        return ContainerConfig_1.ContainerConfig.fromConfig(config);
    }
    static readFromYamlFile(correlationId, path, parameters) {
        let config = pip_services_components_node_2.YamlConfigReader.readConfig(correlationId, path, parameters);
        return ContainerConfig_1.ContainerConfig.fromConfig(config);
    }
}
exports.ContainerConfigReader = ContainerConfigReader;
//# sourceMappingURL=ContainerConfigReader.js.map