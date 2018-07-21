import { IReferences } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { ReferencesDecorator } from './ReferencesDecorator';
export declare class LinkReferencesDecorator extends ReferencesDecorator implements IOpenable {
    private _opened;
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    isOpened(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    put(locator: any, component: any): any;
    remove(locator: any): any;
    removeAll(locator: any): any[];
}
