/** @module build */
import { IFactory } from 'pip-services-components-node';
import { CompositeFactory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class DefaultContainerFactory extends CompositeFactory {
    static readonly Descriptor: Descriptor;
    constructor(...factories: IFactory[]);
}
