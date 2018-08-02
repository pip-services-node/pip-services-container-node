import { Container } from './Container';
export declare class ProcessContainer extends Container {
    protected _configPath: string;
    constructor(name?: string, description?: string);
    private getConfigPath;
    private getParameters;
    private showHelp;
    private printHelp;
    private captureErrors;
    private captureExit;
    run(args: string[]): void;
}
