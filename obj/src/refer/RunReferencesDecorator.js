"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
/**
 * References decorator that automatically opens to newly added components
 * that implement [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/run.iopenable.html IOpenable interface]] and closes removed components
 * that implement [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/run.iclosable.html ICloseable interface]].
 */
class RunReferencesDecorator extends ReferencesDecorator_1.ReferencesDecorator {
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
            let components = this.getAll();
            pip_services_commons_node_1.Opener.open(correlationId, components, (err) => {
                if (err == null)
                    this._opened = true;
                if (callback)
                    callback(err);
            });
        }
        else {
            if (callback)
                callback(null);
        }
    }
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    close(correlationId, callback) {
        if (this._opened) {
            let components = this.getAll();
            pip_services_commons_node_2.Closer.close(correlationId, components, (err) => {
                this._opened = false;
                if (callback)
                    callback(err);
            });
        }
        else {
            if (callback)
                callback(null);
        }
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
            pip_services_commons_node_1.Opener.openOne(null, component, null);
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
            pip_services_commons_node_2.Closer.closeOne(null, component, null);
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
            pip_services_commons_node_2.Closer.close(null, components, null);
        return components;
    }
}
exports.RunReferencesDecorator = RunReferencesDecorator;
//# sourceMappingURL=RunReferencesDecorator.js.map