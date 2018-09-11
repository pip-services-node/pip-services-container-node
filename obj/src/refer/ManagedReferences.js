"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
const BuildReferencesDecorator_1 = require("./BuildReferencesDecorator");
const LinkReferencesDecorator_1 = require("./LinkReferencesDecorator");
const RunReferencesDecorator_1 = require("./RunReferencesDecorator");
/**
 * Manages [[RunReferencesDecorator run]], [[LinkReferencesDecorator link]],
 * [[BuildReferencesDecorator build]], and [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html other references]].
 *
 * @see [[RunReferencesDecorator]]
 * @see [[LinkReferencesDecorator]]
 * @see [[BuildReferencesDecorator]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html References]] (in the PipServices "Commons" package)
 */
class ManagedReferences extends ReferencesDecorator_1.ReferencesDecorator {
    //TODO: Too much?
    /**
     * Creates a new ManagedReferences object using the provided tuples array of
     * references.
     *
     * This constructor passes the tuples array to [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html#constructor References' constructor]],
     * the result of which is passed to [[BuildReferencesDecorator.constructor BuildReferencesDecorator's constructor]]
     * (the created "References" are passed as baseReferences and this object itself is passed as "parent references"),
     * the result of which is passed to [[LinkReferencesDecorator.constructor LinkReferencesDecorator's constructor]],
     * the result of which is passed to [[RunReferencesDecorator.constructor RunReferencesDecorator's constructor]],
     * the result of which is set as this object's base references.
     *
     * @param tuples    the references to initialize the new object with.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html#constructor References' constructor]] (in the PipServices "Commons" package)
     * @see [[BuildReferencesDecorator.constructor BuildReferencesDecorator's constructor]]
     * @see [[LinkReferencesDecorator.constructor LinkReferencesDecorator's constructor]]
     * @see [[RunReferencesDecorator.constructor RunReferencesDecorator's constructor]]
     *
     */
    constructor(tuples = null) {
        super(null, null);
        this._references = new pip_services_commons_node_1.References(tuples);
        this._builder = new BuildReferencesDecorator_1.BuildReferencesDecorator(this._references, this);
        this._linker = new LinkReferencesDecorator_1.LinkReferencesDecorator(this._builder, this);
        this._runner = new RunReferencesDecorator_1.RunReferencesDecorator(this._linker, this);
        this.baseReferences = this._runner;
    }
    /**
     * @returns whether or not all link references were set and all run references
     *          were successfully opened.
     */
    isOpen() {
        return this._linker.isOpen() && this._runner.isOpen();
    }
    /**
     * Sets all links references and, if they are successfully set, opens all run references.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the opening process is complete.
     *                          It will be called with an error if one is raised.
     *
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
     * Closes all run references and, if they are successfully closed, unsets all links references.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the closing process is complete.
     *                          It will be called with an error if one is raised.
     *
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
     * Static method for generating a ManagedReferences object using the provided
     * tuples arrays.
     *
     * @param tuples    the tuples arrays to initialize the new object with.
     *
     * @see [[constructor]]
     */
    static fromTuples(...tuples) {
        return new ManagedReferences(tuples);
    }
}
exports.ManagedReferences = ManagedReferences;
//# sourceMappingURL=ManagedReferences.js.map