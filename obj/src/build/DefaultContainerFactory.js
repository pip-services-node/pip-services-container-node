"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_components_node_2 = require("pip-services-components-node");
const pip_services_components_node_3 = require("pip-services-components-node");
const pip_services_components_node_4 = require("pip-services-components-node");
const pip_services_components_node_5 = require("pip-services-components-node");
const pip_services_components_node_6 = require("pip-services-components-node");
const pip_services_components_node_7 = require("pip-services-components-node");
const pip_services_components_node_8 = require("pip-services-components-node");
const pip_services_components_node_9 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
/**
 * The default container factory provides generic functionality on-demand,
 * such as logging and performance monitoring.
 *
 * Contains a static read-only "container" descriptor.
 *
 * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/build.factory.html Factory]] (in the PipServices "Components" package)
 */
class DefaultContainerFactory extends pip_services_components_node_1.CompositeFactory {
    /**
     * Create a new DefaultContainerFactory object, containing the following factories:
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/info.defaultinfofactory.html DefaultInfoFactory]] (in the PipServices "Components" package)
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/log.defaultloggerfactory.html DefaultLoggerFactory]] (in the PipServices "Components" package)
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/count.defaultcountersfactory.html DefaultCountersFactory]] (in the PipServices "Components" package)
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/config.defaultconfigreaderfactory.html DefaultConfigReaderFactory]] (in the PipServices "Components" package)
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/cache.defaultcachefactory.html DefaultCacheFactory]] (in the PipServices "Components" package)
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/auth.defaultcredentialstorefactory.html DefaultCredentialStoreFactory]] (in the PipServices "Components" package)
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/connect.defaultdiscoveryfactory.html DefaultDiscoveryFactory]] (in the PipServices "Components" package)
     * - [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/test.defaulttestfactory.html DefaultTestFactory]] (in the PipServices "Components" package)
     */
    constructor(...factories) {
        super(...factories);
        this.add(new pip_services_components_node_8.DefaultInfoFactory());
        this.add(new pip_services_components_node_2.DefaultLoggerFactory());
        this.add(new pip_services_components_node_3.DefaultCountersFactory());
        this.add(new pip_services_components_node_4.DefaultConfigReaderFactory());
        this.add(new pip_services_components_node_5.DefaultCacheFactory());
        this.add(new pip_services_components_node_6.DefaultCredentialStoreFactory());
        this.add(new pip_services_components_node_7.DefaultDiscoveryFactory());
        this.add(new pip_services_components_node_9.DefaultTestFactory());
    }
}
DefaultContainerFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "container", "default", "1.0");
exports.DefaultContainerFactory = DefaultContainerFactory;
//# sourceMappingURL=DefaultContainerFactory.js.map