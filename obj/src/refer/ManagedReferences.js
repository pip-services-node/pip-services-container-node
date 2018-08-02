"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ReferencesDecorator_1 = require("./ReferencesDecorator");
const BuildReferencesDecorator_1 = require("./BuildReferencesDecorator");
const LinkReferencesDecorator_1 = require("./LinkReferencesDecorator");
const RunReferencesDecorator_1 = require("./RunReferencesDecorator");
class ManagedReferences extends ReferencesDecorator_1.ReferencesDecorator {
    constructor(tuples = null) {
        super(null, null);
        this._references = new pip_services_commons_node_1.References(tuples);
        this._builder = new BuildReferencesDecorator_1.BuildReferencesDecorator(this._references, this);
        this._linker = new LinkReferencesDecorator_1.LinkReferencesDecorator(this._builder, this);
        this._runner = new RunReferencesDecorator_1.RunReferencesDecorator(this._linker, this);
        this.baseReferences = this._runner;
    }
    isOpen() {
        return this._linker.isOpen() && this._runner.isOpen();
    }
    open(correlationId, callback) {
        this._linker.open(correlationId, (err) => {
            if (err == null)
                this._runner.open(correlationId, callback);
            else if (callback)
                callback(err);
        });
    }
    close(correlationId, callback) {
        this._runner.close(correlationId, (err) => {
            if (err == null)
                this._linker.close(correlationId, callback);
            else if (callback)
                callback(err);
        });
    }
    static fromTuples(...tuples) {
        return new ManagedReferences(tuples);
    }
}
exports.ManagedReferences = ManagedReferences;
//# sourceMappingURL=ManagedReferences.js.map