"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReferencesDecorator {
    constructor(baseReferences, parentReferences) {
        this.baseReferences = baseReferences != null ? baseReferences : parentReferences;
        this.parentReferences = parentReferences != null ? parentReferences : baseReferences;
    }
    put(locator, component) {
        this.baseReferences.put(locator, component);
    }
    remove(locator) {
        return this.baseReferences.remove(locator);
    }
    removeAll(locator) {
        return this.baseReferences.removeAll(locator);
    }
    getAllLocators() {
        return this.baseReferences.getAllLocators();
    }
    getAll() {
        return this.baseReferences.getAll();
    }
    getOneOptional(locator) {
        try {
            let components = this.find(locator, false);
            return components.length > 0 ? components[0] : null;
        }
        catch (ex) {
            return null;
        }
    }
    getOneRequired(locator) {
        let components = this.find(locator, true);
        return components.length > 0 ? components[0] : null;
    }
    getOptional(locator) {
        try {
            return this.find(locator, false);
        }
        catch (ex) {
            return [];
        }
    }
    getRequired(locator) {
        return this.find(locator, true);
    }
    find(locator, required) {
        return this.baseReferences.find(locator, required);
    }
}
exports.ReferencesDecorator = ReferencesDecorator;
//# sourceMappingURL=ReferencesDecorator.js.map