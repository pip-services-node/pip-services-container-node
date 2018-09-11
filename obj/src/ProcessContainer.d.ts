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
export declare class ProcessContainer extends Container {
    protected _configPath: string;
    /**
     * Creates a new ProcessContainer.
     *
     * @param name          (optional) the name of the container (used as context info and as the
     *                      correlation id).
     * @param description   (optional) the container's description (used as context info).
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/info.contextinfo.html ContextInfo]] (in the PipServices "Components" package)
     */
    constructor(name?: string, description?: string);
    private getConfigPath;
    private getParameters;
    private showHelp;
    private printHelp;
    private captureErrors;
    private captureExit;
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
    run(args: string[]): void;
}
