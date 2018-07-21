import { IReferences } from 'pip-services-commons-node';
import { IFactory } from 'pip-services-components-node';
import { ReferencesDecorator } from './ReferencesDecorator';
export declare class BuildReferencesDecorator extends ReferencesDecorator {
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    findFactory(locator: any): IFactory;
    create(locator: any, factory: IFactory): any;
    clarifyLocator(locator: any, factory: IFactory): any;
    find<T>(locator: any, required: boolean): T[];
}
