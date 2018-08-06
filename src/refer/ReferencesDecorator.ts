/** @module refer */
import { IReferences } from 'pip-services-commons-node';

/**
 * Implementation of reference decorators, which can be used to add additional references 
 * to existing base/parent references.
 * 
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" Package)
 */
export class ReferencesDecorator implements IReferences {
	
	//TODO: base AND/OR parent?
	/**
	 * Creates a new ReferencesDecorator object using the given base and/or parent references.
	 * 
	 * @param baseReferences 		the base references that this object will be decorating.
	 * @param parentReferences 		the parent references that this object will be decorating.
	 */
	public constructor(baseReferences: IReferences, parentReferences: IReferences) {
        this.baseReferences = baseReferences != null ? baseReferences : parentReferences;
        this.parentReferences = parentReferences != null ? parentReferences : baseReferences;
    }

	public baseReferences: IReferences;
	public parentReferences: IReferences;

	/**
	 * Puts a new component reference into the base set of references.
	 * 
	 * @param locator 	the locator to find the reference by.
	 * @param component the component reference that is to be added.
	 */
	public put(locator: any, component: any): any {
		this.baseReferences.put(locator, component);
	}
	
	/**
	 * Removes a component reference from the base set of references.
	 * 
	 * @param locator 	the locator of the reference that is to be removed.
	 * @returns the removed reference.
	 * 
	 * @see [[removeAll]]
	 */
	public remove(locator: any): any {
		return this.baseReferences.remove(locator);
	}

	/**
	 * Removes all component references with the given locator from the base 
	 * set of references.
	 * 
	 * @param locator 	the locator to remove references by.
	 * @returns a list, containing all removed references.
	 */
	public removeAll(locator: any): any[] {
		return this.baseReferences.removeAll(locator);
	}

	/**
	 * Gets all stored component locators.
	 * 
	 * @returns a list, containing the locators for all of the stored component references.
	 */
    public getAllLocators(): any[] {
		return this.baseReferences.getAllLocators();
	}

	/**
	 * Gets all stored component references.
	 * 
	 * @returns a list, containing all stored component references.
	 */
	public getAll(): any[] {
		return this.baseReferences.getAll();
	}
		
	/**
	 * Gets a component references that matches the provided locator and the specified type. The search 
	 * is performed, starting from the last-added references.
	 * 
	 * @param locator 	the locator to find a reference by.
	 * @returns the first found component reference or <code>null</code> (if none were found).
	 */
    public getOneOptional<T>(locator: any): T {
    	try {
	        let components = this.find<T>(locator, false);
            return components.length > 0 ? components[0] : null;
    	} catch (ex) {
    		return null;
    	}
    }

	/**
	 * Gets a component reference that matches the provided locator and the specified type.
	 * The search is performed, starting from the last-added references.
	 * 
	 * If no references are found, an exception will be thrown.
	 * 
	 * @param locator 	the locator to find a reference by.	 
	 * @returns the first found component reference.
	 */
    public getOneRequired<T>(locator: any): T {
        let components = this.find<T>(locator, true);
        return components.length > 0 ? components[0] : null;
    }

	/**
	 * Gets a list of component references that match the provided locator and the specified type.
	 * 
	 * @param locator 	the locator to find references by.	 
	 * @returns a list, containing all component references found.
	 */
    public getOptional<T>(locator: any): T[] {
    	try {
    		return this.find<T>(locator, false);
    	} catch (ex) {
            return [];
    	}
    }

	/**
	 * Gets a list of component references that match the provided locator and the specified type. 
	 * If no references are found, an exception will be thrown.
	 * 
	 * @param locator 	the locator to find references by.	 
	 * @returns a list, containing all component references found.
	 */
    public getRequired<T>(locator: any): T[] {
        return this.find<T>(locator, true);
    }

	/**
	 * Finds all references that match the specified query criteria and the specified type.
	 * 
	 * @param locator 	the locator to find a reference by.
	 * @param required 	forces to raise an exception if no reference is found.
	 * @returns a list of found references.
	 */
	public find<T>(locator: any, required: boolean): T[] {
		return this.baseReferences.find<T>(locator, required);
    }

}
