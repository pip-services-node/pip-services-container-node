"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
/**
 * Decorates run references (run stage) as a [[ReferencesDecorator]] and, in addition, opens
 * and closes the components that are referenced.
 */
class RunReferencesDecorator extends ReferencesDecorator_1.ReferencesDecorator {
    /**
     * Creates a new RunReferencesDecorator object, which will decorate the
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
     * @returns whether or not all referenced components have been opened.
     */
    isOpen() {
        return this._opened;
    }
    /**
     * Opens all referenced components. If a component fails to be opened, this object will not be
     * considered open.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the opening process is complete.
     *                          It will be called with an error if one is raised.
     *
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
     * Closes all referenced components. If a component fails to be closed, this object will not be
     * considered closed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the closing process is complete.
     *                          It will be called with an error if one is raised.
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
     * Puts a new component reference into the base set of references. If this object
     * has already been opened, the added component will be opened.
     *
     * @param locator 	the locator to find the component reference by.
     * @param component the component that is to be added.
     */
    put(locator, component) {
        super.put(locator, component);
        if (this._opened)
            pip_services_commons_node_1.Opener.openOne(null, component, null);
    }
    /**
     * Removes a component reference from the base set of references. If this object
     * has already been opened, the removed component will be closed.
     *
     * @param locator 	the locator of the component that is to be removed.
     * @returns the removed component.
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
     * Removes all component references with the given locator from the base
     * set of references. If this object has already been opened, the removed
     * components will be closed.
     *
     * @param locator 	the locator to remove components by.
     * @returns a list, containing all removed components.
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