"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
/**
 * References decorator that automatically sets references to newly added components
 * that implement IReferenceable interface and unsets references from removed components
 * that implement IUnreferenceable interface.
 */
class LinkReferencesDecorator extends ReferencesDecorator_1.ReferencesDecorator {
    /**
     * Creates a new instance of the decorator.
     *
     * @param nextReferences 		the next references or decorator in the chain.
     * @param topReferences 		the decorator at the top of the chain.
     */
    constructor(nextReferences, topReferences) {
        super(nextReferences, topReferences);
        this._opened = false;
    }
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen() {
        return this._opened;
    }
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    open(correlationId, callback) {
        if (!this._opened) {
            this._opened = true;
            let components = this.getAll();
            pip_services_commons_node_1.Referencer.setReferences(this.topReferences, components);
        }
        if (callback)
            callback(null);
    }
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
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
     * Puts a new reference into this reference map.
     *
     * @param locator 	a locator to find the reference by.
     * @param component a component reference to be added.
     */
    put(locator, component) {
        super.put(locator, component);
        if (this._opened)
            pip_services_commons_node_1.Referencer.setReferencesForOne(this.topReferences, component);
    }
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
    remove(locator) {
        let component = super.remove(locator);
        if (this._opened)
            pip_services_commons_node_1.Referencer.unsetReferencesForOne(component);
        return component;
    }
    /**
     * Removes all component references that match the specified locator.
     *
     * @param locator 	the locator to remove references by.
     * @returns a list, containing all removed references.
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