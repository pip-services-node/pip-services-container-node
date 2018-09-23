"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
const BuildReferencesDecorator_1 = require("./BuildReferencesDecorator");
const LinkReferencesDecorator_1 = require("./LinkReferencesDecorator");
const RunReferencesDecorator_1 = require("./RunReferencesDecorator");
/**
 * Managed references that in addition to keeping and locating references can also
 * manage their lifecycle:
 * - Auto-creation of missing component using available factories
 * - Auto-linking newly added components
 * - Auto-opening newly added components
 * - Auto-closing removed components
 *
 * @see [[RunReferencesDecorator]]
 * @see [[LinkReferencesDecorator]]
 * @see [[BuildReferencesDecorator]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html References]] (in the PipServices "Commons" package)
 */
class ManagedReferences extends ReferencesDecorator_1.ReferencesDecorator {
    /**
     * Creates a new instance of the references
     *
     * @param tuples    tuples where odd values are component locators (descriptors) and even values are component references
     */
    constructor(tuples = null) {
        super(null, null);
        this._references = new pip_services_commons_node_1.References(tuples);
        this._builder = new BuildReferencesDecorator_1.BuildReferencesDecorator(this._references, this);
        this._linker = new LinkReferencesDecorator_1.LinkReferencesDecorator(this._builder, this);
        this._runner = new RunReferencesDecorator_1.RunReferencesDecorator(this._linker, this);
        this.nextReferences = this._runner;
    }
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen() {
        return this._linker.isOpen() && this._runner.isOpen();
    }
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    open(correlationId, callback) {
        this._linker.open(correlationId, (err) => {
            if (err == null)
                this._runner.open(correlationId, callback);
            else if (callback)
                callback(err);
        });
    }
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    close(correlationId, callback) {
        this._runner.close(correlationId, (err) => {
            if (err == null)
                this._linker.close(correlationId, callback);
            else if (callback)
                callback(err);
        });
    }
    /**
     * Creates a new ManagedReferences object filled with provided key-value pairs called tuples.
     * Tuples parameters contain a sequence of locator1, component1, locator2, component2, ... pairs.
     *
     * @param tuples	the tuples to fill a new ManagedReferences object.
     * @returns			a new ManagedReferences object.
     */
    static fromTuples(...tuples) {
        return new ManagedReferences(tuples);
    }
}
exports.ManagedReferences = ManagedReferences;
//# sourceMappingURL=ManagedReferences.js.map