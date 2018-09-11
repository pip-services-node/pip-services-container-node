/** @module refer */
import { IReferences } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { ReferencesDecorator } from './ReferencesDecorator';
/**
 * Decorates run references (run stage) as a [[ReferencesDecorator]] and, in addition, opens
 * and closes the components that are referenced.
 */
export declare class RunReferencesDecorator extends ReferencesDecorator implements IOpenable {
    _opened: boolean;
    /**
     * Creates a new RunReferencesDecorator object, which will decorate the
     * given base and/or parent references.
     *
     * @param baseReferences 		the base references that this object will be decorating.
     * @param parentReferences 		the parent references that this object will be decorating.
     */
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    /**
     * @returns whether or not all referenced components have been opened.
     */
    isOpen(): boolean;
    /**
     * Opens all referenced components. If a component fails to be opened, this object will not be
     * considered open.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the opening process is complete.
     *                          It will be called with an error if one is raised.
     *
     */
    open(correlationId: string, callback?: (err: any) => void): void;
    /**
     * Closes all referenced components. If a component fails to be closed, this object will not be
     * considered closed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the closing process is complete.
     *                          It will be called with an error if one is raised.
     */
    close(correlationId: string, callback?: (err: any) => void): void;
    /**
     * Puts a new component reference into the base set of references. If this object
     * has already been opened, the added component will be opened.
     *
     * @param locator 	the locator to find the component reference by.
     * @param component the component that is to be added.
     */
    put(locator: any, component: any): void;
    /**
     * Removes a component reference from the base set of references. If this object
     * has already been opened, the removed component will be closed.
     *
     * @param locator 	the locator of the component that is to be removed.
     * @returns the removed component.
     *
     * @see [[removeAll]]
     */
    remove(locator: any): any;
    /**
     * Removes all component references with the given locator from the base
     * set of references. If this object has already been opened, the removed
     * components will be closed.
     *
     * @param locator 	the locator to remove components by.
     * @returns a list, containing all removed components.
     */
    removeAll(locator: any): any[];
}
