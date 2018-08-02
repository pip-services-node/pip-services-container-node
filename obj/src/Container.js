"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_components_node_2 = require("pip-services-components-node");
const pip_services_components_node_3 = require("pip-services-components-node");
const pip_services_components_node_4 = require("pip-services-components-node");
const DefaultContainerFactory_1 = require("./build/DefaultContainerFactory");
const ContainerConfig_1 = require("./config/ContainerConfig");
const ContainerConfigReader_1 = require("./config/ContainerConfigReader");
const ContainerReferences_1 = require("./refer/ContainerReferences");
class Container {
    constructor(name, description) {
        this._logger = new pip_services_components_node_1.NullLogger();
        this._factories = new DefaultContainerFactory_1.DefaultContainerFactory();
        // Override in child classes
        this._info = new pip_services_components_node_3.ContextInfo(name, description);
    }
    configure(config) {
        this._config = ContainerConfig_1.ContainerConfig.fromConfig(config);
    }
    readConfigFromFile(correlationId, path, parameters) {
        this._config = ContainerConfigReader_1.ContainerConfigReader.readFromFile(correlationId, path, parameters);
        this._logger.trace(correlationId, this._config.toString());
    }
    setReferences(references) {
        // Override in child classes
    }
    unsetReferences() {
        // Override in child classes
    }
    initReferences(references) {
        let existingInfo = references.getOneOptional(pip_services_components_node_4.DefaultInfoFactory.ContextInfoDescriptor);
        if (existingInfo == null)
            references.put(pip_services_components_node_4.DefaultInfoFactory.ContextInfoDescriptor, this._info);
        else
            this._info = existingInfo;
        references.put(DefaultContainerFactory_1.DefaultContainerFactory.Descriptor, this._factories);
    }
    isOpen() {
        return this._references != null;
    }
    open(correlationId, callback) {
        if (this._references != null) {
            var err = new pip_services_commons_node_2.InvalidStateException(correlationId, "ALREADY_OPENED", "Container was already opened");
            if (callback)
                callback(err);
            else
                throw err;
            return;
        }
        try {
            this._logger.trace(correlationId, "Starting container.");
            // Create references with configured components
            this._references = new ContainerReferences_1.ContainerReferences();
            this.initReferences(this._references);
            this._references.putFromConfig(this._config);
            this.setReferences(this._references);
            // Get custom description if available
            let infoDescriptor = new pip_services_commons_node_1.Descriptor("*", "context-info", "*", "*", "*");
            this._info = this._references.getOneOptional(infoDescriptor);
            this._references.open(correlationId, (err) => {
                // Get reference to logger
                this._logger = new pip_services_components_node_2.CompositeLogger(this._references);
                this._logger.info(correlationId, "Container %s started.", this._info.name);
                if (err) {
                    this._logger.fatal(correlationId, err, "Failed to start container");
                    this.close(correlationId, callback);
                }
                else {
                    if (callback)
                        callback(null);
                }
            });
        }
        catch (ex) {
            this._logger.fatal(correlationId, ex, "Failed to start container");
            this.close(correlationId, (err) => {
                if (callback)
                    callback(ex);
                else
                    throw ex;
            });
        }
    }
    close(correlationId, callback) {
        // Skip if container wasn't opened
        if (this._references == null) {
            if (callback)
                callback(null);
            return;
        }
        try {
            this._logger.trace(correlationId, "Stopping %s container", this._info.name);
            // Unset references for child container
            this.unsetReferences();
            // Close and deference components
            this._references.close(correlationId, (err) => {
                this._references = null;
                this._logger.info(correlationId, "Container %s stopped", this._info.name);
                if (callback)
                    callback(null);
            });
        }
        catch (ex) {
            this._logger.error(correlationId, ex, "Failed to stop container");
            if (callback)
                callback(ex);
            else
                throw ex;
        }
    }
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map