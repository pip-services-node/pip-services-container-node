/** @module refer */
/** @hidden */
let _ = require('lodash');

import { IReferences } from 'pip-services-commons-node';
import { ReferenceException } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IFactory } from 'pip-services-components-node';

import { ReferencesDecorator } from './ReferencesDecorator';

export class BuildReferencesDecorator extends ReferencesDecorator {
    public constructor(baseReferences: IReferences, parentReferences: IReferences) {
    	super(baseReferences, parentReferences);
    }
	
    public findFactory(locator: any): IFactory {
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

    public create(locator: any, factory: IFactory): any {
        if (factory == null) return null;

        try {
            // Create component
            return factory.create(locator);
        } catch (ex) {
            return null;
        }
    }

    public clarifyLocator(locator: any, factory: IFactory): any {
        if (factory == null) return locator;
        if (!(locator instanceof Descriptor)) return locator;
        
        let anotherLocator = factory.canCreate(locator);
    	if (anotherLocator == null) return locator;
    	if (!(anotherLocator instanceof Descriptor)) return locator;
    	
    	let descriptor: Descriptor = locator;
    	let anotherDescriptor: Descriptor = anotherLocator;
    	
    	return new Descriptor(
    		descriptor.getGroup() != null ? descriptor.getGroup() : anotherDescriptor.getGroup(),
    		descriptor.getType() != null ? descriptor.getType() : anotherDescriptor.getType(),
    		descriptor.getKind() != null ? descriptor.getKind() : anotherDescriptor.getKind(),
    		descriptor.getName() != null ? descriptor.getName() : anotherDescriptor.getName(),
    		descriptor.getVersion() != null ? descriptor.getVersion() : anotherDescriptor.getVersion()
		);
    }

    public find<T>(locator: any, required: boolean): T[] {
        let components = super.find<T>(locator, false);

        // Try to create component
        if (required && components.length == 0) {
            let factory = this.findFactory(locator);
            let component = this.create(locator, factory);
            if (component != null) {
                try {
                	locator = this.clarifyLocator(locator, factory);
                    this.parentReferences.put(locator, component);
                    components.push(component);
                } catch (ex) {
                    // Ignore exception
                }
            }
        }

        // Throw exception is no required components found
        if (required && components.length == 0)
            throw new ReferenceException(null, locator);

        return components;
    }
}
