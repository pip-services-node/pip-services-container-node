"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
class DummyController {
    constructor() {
        this._timer = new pip_services_commons_node_1.FixedRateTimer(this, 1000, 1000);
        this._logger = new pip_services_components_node_1.CompositeLogger();
        this._message = "Hello World!";
        this._counter = 0;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    get counter() {
        return this._counter;
    }
    set counter(value) {
        this._counter = value;
    }
    configure(config) {
        this.message = config.getAsStringWithDefault("message", this.message);
    }
    setReferences(references) {
        this._logger.setReferences(references);
    }
    isOpen() {
        return this._timer.isStarted();
    }
    open(correlationId, callback) {
        try {
            this._timer.start();
            this._logger.trace(correlationId, "Dummy controller opened");
            if (callback)
                callback(null);
        }
        catch (ex) {
            this._logger.error(correlationId, ex, "Failed to open Dummy container");
            if (callback)
                callback(ex);
            else
                throw ex;
        }
    }
    close(correlationId, callback) {
        try {
            this._timer.stop();
            this._logger.trace(correlationId, "Dummy controller closed");
            if (callback)
                callback(null);
        }
        catch (ex) {
            this._logger.error(correlationId, ex, "Failed to close Dummy container");
            if (callback)
                callback(ex);
            else
                throw ex;
        }
    }
    notify(correlationId, args) {
        this._logger.info(correlationId, "%d - %s", this.counter++, this.message);
    }
}
exports.DummyController = DummyController;
//# sourceMappingURL=DummyController.js.map