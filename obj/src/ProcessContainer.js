"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let process = require('process');
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Container_1 = require("./Container");
class ProcessContainer extends Container_1.Container {
    constructor(name, description) {
        super(name, description);
        this._configPath = './config/config.yml';
        this._logger = new pip_services_components_node_1.ConsoleLogger();
    }
    getConfigPath(args) {
        for (let index = 0; index < args.length; index++) {
            let arg = args[index];
            let nextArg = index < args.length - 1 ? args[index + 1] : null;
            nextArg = nextArg && nextArg.startsWith('-') ? null : nextArg;
            if (nextArg != null) {
                if (arg == "--config" || arg == "-c") {
                    return nextArg;
                }
            }
        }
        return this._configPath;
    }
    getParameters(args) {
        // Process command line parameters
        let line = '';
        for (let index = 0; index < args.length; index++) {
            let arg = args[index];
            let nextArg = index < args.length - 1 ? args[index + 1] : null;
            nextArg = nextArg && nextArg.startsWith('-') ? null : nextArg;
            if (nextArg != null) {
                if (arg == "--param" || arg == "--params" || arg == "-p") {
                    if (line.length > 0)
                        line = line + ';';
                    line = line + nextArg;
                    index++;
                }
            }
        }
        let parameters = pip_services_commons_node_1.ConfigParams.fromString(line);
        // Process environmental variables
        parameters.append(process.env);
        return parameters;
    }
    showHelp(args) {
        for (let index = 0; index < args.length; index++) {
            let arg = args[index];
            if (arg == "--help" || arg == "-h")
                return true;
        }
        return false;
    }
    printHelp() {
        console.log("Pip.Services process container - http://www.github.com/pip-services/pip-services");
        console.log("run [-h] [-c <config file>] [-p <param>=<value>]*");
    }
    captureErrors(correlationId) {
        // Log uncaught exceptions
        process.on('uncaughtException', (ex) => {
            this._logger.fatal(correlationId, ex, "Process is terminated");
            process.exit(1);
        });
    }
    captureExit(correlationId) {
        this._logger.info(correlationId, "Press Control-C to stop the microservice...");
        // Activate graceful exit
        process.on('SIGINT', () => {
            process.exit();
        });
        // Gracefully shutdown
        process.on('exit', () => {
            this.close(correlationId);
            this._logger.info(correlationId, "Goodbye!");
        });
    }
    run(args) {
        if (this.showHelp(args)) {
            this.printHelp();
            return;
        }
        let correlationId = this._info.name;
        let path = this.getConfigPath(args);
        let parameters = this.getParameters(args);
        this.readConfigFromFile(correlationId, path, parameters);
        this.captureErrors(correlationId);
        this.captureExit(correlationId);
        this.open(correlationId);
    }
}
exports.ProcessContainer = ProcessContainer;
//# sourceMappingURL=ProcessContainer.js.map