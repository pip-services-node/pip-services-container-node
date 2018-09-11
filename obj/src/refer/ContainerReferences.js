"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const ManagedReferences_1 = require("./ManagedReferences");
/**
 * Stores a container's complete set of references.
 *
 * @see [[ManagedReferences]]
 */
class ContainerReferences extends ManagedReferences_1.ManagedReferences {
    //TODO: too much?
    /**
     * Adds [[ComponentConfig component configurations]] to this ContainerReferences object.
     *
     * For each [[ComponentConfig component configuration]] in the passed [[ContainerConfig container configuration]]
     * the following is done:
     *
     * * References are set:
     *     * if the ComponentConfig contains a "type" - an attempt will be made to create the component
     *     dynamically.
     *     * otherwise, if the ComponentConfig contains a "descriptor" - an attempt will be made to create
     *     the component using the stored locator-[[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]].
     *     * if the component was successfully created - it is added to this object's list of references.
     * * The component is setup:
     *     * if the component [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html is configurable]] -
     *     it will be configured using the ComponentConfig's "config".
     *     * if the component [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html can reference]]
     *     other components (factories) - it will be set to reference this ContainerReferences object.
     *
     * @see [[ContainerConfig]]
     * @see [[ComponentConfig]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.descriptor.html Descriptor]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html IReferenceable]] (in the PipServices "Commons" package)
     *
     * @param config    the ContainerConfig, whose [[ComponentConfig ComponentConfigs]] are to be added.
     *
     *
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/build.createexception.html CreateException]]
     *          if the component cannot be created using one of the ContainerConfig's ComponentConfig's
     *          (explicit) "type" or "descriptor" (locator).
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referenceexception.html ReferenceException]]
     *          if an object cannot be created by one of the ContainerConfig's ComponentConfig's descriptor
     *          (locator).
     * @throws a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.referenceexception.html ReferenceException]]
     *          if any other exception is raised.
     */
    putFromConfig(config) {
        for (var i = 0; i < config.length; i++) {
            let componentConfig = config[i];
            let component;
            let locator;
            try {
                // Create component dynamically
                if (componentConfig.type != null) {
                    locator = componentConfig.type;
                    component = pip_services_commons_node_1.TypeReflector.createInstanceByDescriptor(componentConfig.type);
                    // Or create component statically
                }
                else if (componentConfig.descriptor != null) {
                    locator = componentConfig.descriptor;
                    let factory = this._builder.findFactory(locator);
                    component = this._builder.create(locator, factory);
                    if (component == null)
                        throw new pip_services_commons_node_2.ReferenceException(null, locator);
                    locator = this._builder.clarifyLocator(locator, factory);
                }
                // Check that component was created
                if (component == null) {
                    throw new pip_services_components_node_1.CreateException("CANNOT_CREATE_COMPONENT", "Cannot create component")
                        .withDetails("config", config);
                }
                // Add component to the list
                this._references.put(locator, component);
                if (component.configure) {
                    // Configure component
                    var configurable = component;
                    configurable.configure(componentConfig.config);
                }
                // Set references to factories
                if (component.canCreate && component.create) {
                    var referenceable = component;
                    referenceable.setReferences(this);
                }
            }
            catch (ex) {
                throw new pip_services_commons_node_2.ReferenceException(null, locator)
                    .withCause(ex);
            }
        }
    }
}
exports.ContainerReferences = ContainerReferences;
//# sourceMappingURL=ContainerReferences.js.map