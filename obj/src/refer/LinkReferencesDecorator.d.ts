/** @module refer */
import { IReferences } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { ReferencesDecorator } from './ReferencesDecorator';
/**
 * References decorator that automatically sets references to newly added components
 * that implement [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html IReferenceable interface]] and unsets references from removed components
 * that implement [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.iunreferenceable.html IUnreferenceable interface]].
 */
export declare class LinkReferencesDecorator extends ReferencesDecorator implements IOpenable {
    private _opened;
    /**
     * Creates a new instance of the decorator.
     *
     * @param nextReferences 		the next references or decorator in the chain.
     * @param topReferences 		the decorator at the top of the chain.
     */
    constructor(nextReferences: IReferences, topReferences: IReferences);
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen(): boolean;
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    open(correlationId: string, callback?: (err: any) => void): void;
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    close(correlationId: string, callback?: (err: any) => void): void;
    /**
     * Puts a new reference into this reference map.
     *
     * @param locator 	a locator to find the reference by.
     * @param component a component reference to be added.
     */
    put(locator: any, component: any): any;
    /**
     * Removes a previously added reference that matches specified locator.
     * If many references match the locator, it removes only the first one.
     * When all references shall be removed, use [[removeAll]] method instead.
     *
     * @param locator 	a locator to remove reference
     * @returns the removed component reference.
     *
     * @see [[removeAll]]
     */
    remove(locator: any): any;
    /**
     * Removes all component references that match the specified locator.
     *
     * @param locator 	the locator to remove references by.
     * @returns a list, containing all removed references.
     */
    removeAll(locator: any): any[];
}
