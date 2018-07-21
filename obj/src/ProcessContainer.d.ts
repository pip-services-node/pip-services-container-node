import { Container } from './Container';
export declare class ProcessContainer extends Container {
    protected _configPath: string;
    constructor(name?: string, description?: string);
    private getConfigPath(args);
    private getParameters(args);
    private showHelp(args);
    private printHelp();
    private captureErrors(correlationId);
    private captureExit(correlationId);
    run(args: string[]): void;
}
