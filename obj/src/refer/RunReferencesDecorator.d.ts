/** @module refer */
import { IReferences } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { ReferencesDecorator } from './ReferencesDecorator';
export declare class RunReferencesDecorator extends ReferencesDecorator implements IOpenable {
    _opened: boolean;
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    isOpen(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    put(locator: any, component: any): void;
    remove(locator: any): any;
    removeAll(locator: any): any[];
}
