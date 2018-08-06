/** @module refer */
import { IReferences } from 'pip-services-commons-node';
import { Referencer } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';

import { ReferencesDecorator } from './ReferencesDecorator'

//TODO: not 100% sure how Referencer "links" components. Research and add to the comment.
/**
 * Combines the functionality of the [[ReferencesDecorator]] 
 * and [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referencer.html Referencer]]
 * classes by setting and unsetting link references (link stage) on calls to the 
 * <code>open</code> and <code>close</code> methods, respectively.
 * 
 * @see [[ReferencesDecorator]] 
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referencer.html Referencer]] (in the PipServices "Commons" Package)
 */
export class LinkReferencesDecorator extends ReferencesDecorator implements IOpenable {
    private _opened: boolean = false;

    /**
     * Creates a new LinkReferencesDecorator object, which will decorate the 
     * given base and/or parent references.
     * 
     * @param baseReferences 		the base references that this object will be decorating.
	 * @param parentReferences 		the parent references that this object will be decorating.
	 */
    public constructor(baseReferences: IReferences, parentReferences: IReferences) {
    	super(baseReferences, parentReferences);
    }

    /**
     * @returns whether or not references to all components have been set.
     */
    public isOpen(): boolean {
        return this._opened;
    }

    /**
     * Sets references to all referenced components.
     * 
	 * @param correlationId 	not used.
     * @param callback 			(optional) will be called with <code>null</code> when the 
     *                          opening process is complete. 
     */
    public open(correlationId: string, callback?: (err: any) => void): void {
        if (!this._opened) {
            this._opened = true;
            let components = this.getAll();
            Referencer.setReferences(this.parentReferences, components);
        }

        if (callback) callback(null);
    }

    /**
     * Unsets references to all referenced components.
     * 
	 * @param correlationId 	not used.
     * @param callback 			(optional) will be called with <code>null</code> when the 
     *                          closing process is complete. 
     */
    public close(correlationId: string, callback?: (err: any) => void): void {
        if (this._opened) {
            this._opened = false;
            let components = this.getAll();
            Referencer.unsetReferences(components);
        }

        if (callback) callback(null);
    }

    /**
	 * Puts a new component reference into the base set of references. If this object
     * has already been opened, the added component's reference will be set.
	 * 
	 * @param locator 	the locator to find the component reference by.
	 * @param component the component that is to be added.
	 */
    public put(locator: any, component: any): any {
        super.put(locator, component);

        if (this._opened)
            Referencer.setReferencesForOne(this.parentReferences, component);
    }

    /**
	 * Removes a component reference from the base set of references. If this object
     * has already been opened, the removed component's reference will be unset.
	 * 
	 * @param locator 	the locator of the component that is to be removed.
	 * @returns the removed component.
	 * 
	 * @see [[removeAll]]
	 */
    public remove(locator: any): any {
        let component = super.remove(locator);

        if (this._opened)
            Referencer.unsetReferencesForOne(component);

        return component;
    }

    /**
	 * Removes all component references with the given locator from the base 
	 * set of references. If this object has already been opened, the removed 
     * components' references will be unset.
	 * 
	 * @param locator 	the locator to remove components by.
	 * @returns a list, containing all removed components.
	 */
    public removeAll(locator: any): any[] {
        let components = super.removeAll(locator);

        if (this._opened)
            Referencer.unsetReferences(components);

        return components;
    }
}
