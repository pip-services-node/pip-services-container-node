"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
//TODO: not 100% sure how Referencer "links" components. Research and add to the comment.
/**
 * Combines the functionality of the [[ReferencesDecorator]]
 * and [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referencer.html Referencer]]
 * classes by setting and unsetting link references (link stage) on calls to the
 * <code>open</code> and <code>close</code> methods, respectively.
 *
 * @see [[ReferencesDecorator]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referencer.html Referencer]] (in the PipServices "Commons" package)
 */
class LinkReferencesDecorator extends ReferencesDecorator_1.ReferencesDecorator {
    /**
     * Creates a new LinkReferencesDecorator object, which will decorate the
     * given base and/or parent references.
     *
     * @param baseReferences 		the base references that this object will be decorating.
     * @param parentReferences 		the parent references that this object will be decorating.
     */
    constructor(baseReferences, parentReferences) {
        super(baseReferences, parentReferences);
        this._opened = false;
    }
    /**
     * @returns whether or not references to all components have been set.
     */
    isOpen() {
        return this._opened;
    }
    /**
     * Sets references to all referenced components.
     *
     * @param correlationId 	not used.
     * @param callback 			(optional) will be called with <code>null</code> when the
     *                          opening process is complete.
     */
    open(correlationId, callback) {
        if (!this._opened) {
            this._opened = true;
            let components = this.getAll();
            pip_services_commons_node_1.Referencer.setReferences(this.parentReferences, components);
        }
        if (callback)
            callback(null);
    }
    /**
     * Unsets references to all referenced components.
     *
     * @param correlationId 	not used.
     * @param callback 			(optional) will be called with <code>null</code> when the
     *                          closing process is complete.
     */
    close(correlationId, callback) {
        if (this._opened) {
            this._opened = false;
            let components = this.getAll();
            pip_services_commons_node_1.Referencer.unsetReferences(components);
        }
        if (callback)
            callback(null);
    }
    /**
     * Puts a new component reference into the base set of references. If this object
     * has already been opened, the added component's reference will be set.
     *
     * @param locator 	the locator to find the component reference by.
     * @param component the component that is to be added.
     */
    put(locator, component) {
        super.put(locator, component);
        if (this._opened)
            pip_services_commons_node_1.Referencer.setReferencesForOne(this.parentReferences, component);
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
    remove(locator) {
        let component = super.remove(locator);
        if (this._opened)
            pip_services_commons_node_1.Referencer.unsetReferencesForOne(component);
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
    removeAll(locator) {
        let components = super.removeAll(locator);
        if (this._opened)
            pip_services_commons_node_1.Referencer.unsetReferences(components);
        return components;
    }
}
exports.LinkReferencesDecorator = LinkReferencesDecorator;
//# sourceMappingURL=LinkReferencesDecorator.js.map