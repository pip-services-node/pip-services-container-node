import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { INotifiable } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
export declare class DummyController implements IReferenceable, IReconfigurable, IOpenable, INotifiable {
    private readonly _timer;
    private readonly _logger;
    private _message;
    private _counter;
    constructor();
    message: string;
    counter: number;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpened(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    notify(correlationId: string, args: Parameters): void;
}
