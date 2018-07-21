"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const DummyController_1 = require("./DummyController");
class DummyFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(DummyFactory.ControllerDescriptor, DummyController_1.DummyController);
    }
}
DummyFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-dummies", "factory", "default", "default", "1.0");
DummyFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-dummies", "controller", "default", "*", "1.0");
exports.DummyFactory = DummyFactory;
//# sourceMappingURL=DummyFactory.js.map