/** @module refer */
import { TypeReflector } from 'pip-services-commons-node';
import { ReferenceException } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { CreateException } from 'pip-services-components-node';

import { ComponentConfig } from '../config/ComponentConfig';
import { ContainerConfig } from '../config/ContainerConfig';
import { ManagedReferences } from './ManagedReferences';

export class ContainerReferences extends ManagedReferences {

    public putFromConfig(config: ContainerConfig): void {
        for(var i = 0; i < config.length; i++) {
            let componentConfig: ComponentConfig = config[i];
            let component: any;
            let locator: any;

            try {
                // Create component dynamically
                if (componentConfig.type != null) {
                    locator = componentConfig.type;
                    component = TypeReflector.createInstanceByDescriptor(componentConfig.type);
                // Or create component statically
                } else if (componentConfig.descriptor != null) {
					locator = componentConfig.descriptor;
					let factory = this._builder.findFactory(locator);
					component = this._builder.create(locator, factory);
					if (component == null)
						throw new ReferenceException(null, locator);
					locator = this._builder.clarifyLocator(locator, factory);
                }

                // Check that component was created
                if (component == null) {
                    throw new CreateException("CANNOT_CREATE_COMPONENT", "Cannot create component")
                        .withDetails("config", config);
                }

                // Add component to the list
                this._references.put(locator, component);

                if (component.configure) {
                    // Configure component
                    var configurable = component as IConfigurable;
                    configurable.configure(componentConfig.config);
                }

                // Set references to factories
                if (component.canCreate && component.create) {
                    var referenceable = component as IReferenceable;
                    referenceable.setReferences(this);
                }
            } catch (ex) {
                throw new ReferenceException(null, locator)
                    .withCause(ex);
            }
        }
    }
		
}