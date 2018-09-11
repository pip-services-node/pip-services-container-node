/** @module refer */
import { IReferences } from 'pip-services-commons-node';
/**
 * Implementation of reference decorators, which can be used to add additional references
 * to existing base/parent references.
 *
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
 */
export declare class ReferencesDecorator implements IReferences {
    /**
     * Creates a new ReferencesDecorator object using the given base and/or parent references.
     *
     * @param baseReferences 		the base references that this object will be decorating.
     * @param parentReferences 		the parent references that this object will be decorating.
     */
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    baseReferences: IReferences;
    parentReferences: IReferences;
    /**
     * Puts a new component reference into the base set of references.
     *
     * @param locator 	the locator to find the reference by.
     * @param component the component reference that is to be added.
     */
    put(locator: any, component: any): any;
    /**
     * Removes a component reference from the base set of references.
     *
     * @param locator 	the locator of the reference that is to be removed.
     * @returns the removed reference.
     *
     * @see [[removeAll]]
     */
    remove(locator: any): any;
    /**
     * Removes all component references with the given locator from the base
     * set of references.
     *
     * @param locator 	the locator to remove references by.
     * @returns a list, containing all removed references.
     */
    removeAll(locator: any): any[];
    /**
     * Gets all stored component locators.
     *
     * @returns a list, containing the locators for all of the stored component references.
     */
    getAllLocators(): any[];
    /**
     * Gets all stored component references.
     *
     * @returns a list, containing all stored component references.
     */
    getAll(): any[];
    /**
     * Gets a component references that matches the provided locator and the specified type. The search
     * is performed, starting from the last-added references.
     *
     * @param locator 	the locator to find a reference by.
     * @returns the first found component reference or <code>null</code> (if none were found).
     */
    getOneOptional<T>(locator: any): T;
    /**
     * Gets a component reference that matches the provided locator and the specified type.
     * The search is performed, starting from the last-added references.
     *
     * If no references are found, an exception will be thrown.
     *
     * @param locator 	the locator to find a reference by.
     * @returns the first found component reference.
     */
    getOneRequired<T>(locator: any): T;
    /**
     * Gets a list of component references that match the provided locator and the specified type.
     *
     * @param locator 	the locator to find references by.
     * @returns a list, containing all component references found.
     */
    getOptional<T>(locator: any): T[];
    /**
     * Gets a list of component references that match the provided locator and the specified type.
     * If no references are found, an exception will be thrown.
     *
     * @param locator 	the locator to find references by.
     * @returns a list, containing all component references found.
     */
    getRequired<T>(locator: any): T[];
    /**
     * Finds all references that match the specified query criteria and the specified type.
     *
     * @param locator 	the locator to find a reference by.
     * @param required 	forces to raise an exception if no reference is found.
     * @returns a list of found references.
     */
    find<T>(locator: any, required: boolean): T[];
}
