import { IReferences } from 'pip-services-commons-node';
export declare class ReferencesDecorator implements IReferences {
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    baseReferences: IReferences;
    parentReferences: IReferences;
    put(locator: any, component: any): any;
    remove(locator: any): any;
    removeAll(locator: any): any[];
    getAllLocators(): any[];
    getAll(): any[];
    getOneOptional<T>(locator: any): T;
    getOneRequired<T>(locator: any): T;
    getOptional<T>(locator: any): T[];
    getRequired<T>(locator: any): T[];
    find<T>(locator: any, required: boolean): T[];
}
