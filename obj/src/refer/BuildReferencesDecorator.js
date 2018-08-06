"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
/** @hidden */
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
class BuildReferencesDecorator extends ReferencesDecorator_1.ReferencesDecorator {
    constructor(baseReferences, parentReferences) {
        super(baseReferences, parentReferences);
    }
    findFactory(locator) {
        let components = this.getAll();
        for (let index = 0; index < components.length; index++) {
            let component = components[index];
            if (_.isFunction(component.canCreate) && _.isFunction(component.create)) {
                if (component.canCreate(locator))
                    return component;
            }
        }
        return null;
    }
    create(locator, factory) {
        if (factory == null)
            return null;
        try {
            // Create component
            return factory.create(locator);
        }
        catch (ex) {
            return null;
        }
    }
    clarifyLocator(locator, factory) {
        if (factory == null)
            return locator;
        if (!(locator instanceof pip_services_commons_node_2.Descriptor))
            return locator;
        let anotherLocator = factory.canCreate(locator);
        if (anotherLocator == null)
            return locator;
        if (!(anotherLocator instanceof pip_services_commons_node_2.Descriptor))
            return locator;
        let descriptor = locator;
        let anotherDescriptor = anotherLocator;
        return new pip_services_commons_node_2.Descriptor(descriptor.getGroup() != null ? descriptor.getGroup() : anotherDescriptor.getGroup(), descriptor.getType() != null ? descriptor.getType() : anotherDescriptor.getType(), descriptor.getKind() != null ? descriptor.getKind() : anotherDescriptor.getKind(), descriptor.getName() != null ? descriptor.getName() : anotherDescriptor.getName(), descriptor.getVersion() != null ? descriptor.getVersion() : anotherDescriptor.getVersion());
    }
    find(locator, required) {
        let components = super.find(locator, false);
        // Try to create component
        if (required && components.length == 0) {
            let factory = this.findFactory(locator);
            let component = this.create(locator, factory);
            if (component != null) {
                try {
                    locator = this.clarifyLocator(locator, factory);
                    this.parentReferences.put(locator, component);
                    components.push(component);
                }
                catch (ex) {
                    // Ignore exception
                }
            }
        }
        // Throw exception is no required components found
        if (required && components.length == 0)
            throw new pip_services_commons_node_1.ReferenceException(null, locator);
        return components;
    }
}
exports.BuildReferencesDecorator = BuildReferencesDecorator;
//# sourceMappingURL=BuildReferencesDecorator.js.map