"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
class RunReferencesDecorator extends ReferencesDecorator_1.ReferencesDecorator {
    constructor(baseReferences, parentReferences) {
        super(baseReferences, parentReferences);
        this._opened = false;
    }
    isOpened() {
        return this._opened;
    }
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
    put(locator, component) {
        super.put(locator, component);
        if (this._opened)
            pip_services_commons_node_1.Opener.openOne(null, component, null);
    }
    remove(locator) {
        let component = super.remove(locator);
        if (this._opened)
            pip_services_commons_node_2.Closer.closeOne(null, component, null);
        return component;
    }
    removeAll(locator) {
        let components = super.removeAll(locator);
        if (this._opened)
            pip_services_commons_node_2.Closer.close(null, components, null);
        return components;
    }
}
exports.RunReferencesDecorator = RunReferencesDecorator;
//# sourceMappingURL=RunReferencesDecorator.js.map