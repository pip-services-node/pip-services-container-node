/** @module core */
/** @hidden */
let process = require('process');

import { ConsoleLogger } from 'pip-services-components-node';
import { ConfigParams } from 'pip-services-commons-node';

import { Container } from './Container';

/**
 * Represents a system process. 
 * 
 * A ProcessContainer receives its configuration file via the command line, creates the container, 
 * starts it, reads its configuration, recreates objects, runs them, and then, after ctrl-c is 
 * pressed, turns off and destroys the objects.  
 * 
 * All ProcessContainer logs are written to the console.
 * 
 * ProcessContainer run arguments:
 * - <code>--config / -c</code> - defines the path to the container's target JSON/YAML configuration file.
 * - <code>--param / --params / -p</code> - defines how the [[ContainerConfigReader configuration reader]] 
 * is to be parameterizing.
 * - <code>--help / -h</code> - prints the ProcessContainer's help.
 * 
 * ### Example ###
 * 
 *      export class MyDataProcess extends ProcessContainer {
 *          public constructor() {
 *              super("MyData", "Description MyData");
 *          } 
 *          ...
 *      }
 */
export class ProcessContainer extends Container {
    protected _configPath: string = './config/config.yml';

    /**
     * Creates a new ProcessContainer.
     * 
     * @param name          (optional) the name of the container (used as context info and as the 
     *                      correlation id).
     * @param description   (optional) the container's description (used as context info).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/info.contextinfo.html ContextInfo]] (in the PipServices "Components" package)
     */
    public constructor(name?: string, description?: string) {
        super(name, description);
        this._logger = new ConsoleLogger();
    }

    private getConfigPath(args: string[]): string {
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

    private getParameters(args: string[]): ConfigParams {
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
        let parameters = ConfigParams.fromString(line);

        // Process environmental variables
        parameters.append(process.env);

        return parameters;
    }

    private showHelp(args: string[]) {
        for (let index = 0; index < args.length; index++) {
            let arg = args[index];
            if (arg == "--help" || arg == "-h")
                return true;
        }
        return false;
    }

    private printHelp() {
        console.log("Pip.Services process container - http://www.github.com/pip-services/pip-services");
        console.log("run [-h] [-c <config file>] [-p <param>=<value>]*");
    }
    
    private captureErrors(correlationId: string): void {
        // Log uncaught exceptions
        process.on('uncaughtException', (ex) => {
			this._logger.fatal(correlationId, ex, "Process is terminated");
            process.exit(1);
        });
    }

    private captureExit(correlationId: string): void {
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

    /**
     * Runs this ProcessContainer by:
     * - retrieving the path to the configuration file and the reader's parameters in 
     * accordance with the given arguments; 
     * - [[readConfigFromFile reading]] the configuration file using the retrieved path 
     * and parameters;
     * - calling this container's [[open]] method.
     * 
     * @param args  the arguments to run the container with.
     */
    public run(args: string[]): void {
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
