import { IFactory } from 'pip-services-components-node';
import { CompositeFactory } from 'pip-services-components-node';
import { DefaultLoggerFactory } from 'pip-services-components-node';
import { DefaultCountersFactory } from 'pip-services-components-node';
import { DefaultConfigReaderFactory } from 'pip-services-components-node';
import { DefaultCacheFactory } from 'pip-services-components-node';
import { DefaultCredentialStoreFactory } from 'pip-services-components-node';
import { DefaultDiscoveryFactory } from 'pip-services-components-node';
import { DefaultInfoFactory } from 'pip-services-components-node';
import { DefaultTestFactory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

export class DefaultContainerFactory extends CompositeFactory {
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services", "factory", "container", "default", "1.0");

    public constructor(...factories: IFactory[]) {
        super(...factories);

        this.add(new DefaultInfoFactory());
        this.add(new DefaultLoggerFactory());
        this.add(new DefaultCountersFactory());
        this.add(new DefaultConfigReaderFactory());
        this.add(new DefaultCacheFactory());
        this.add(new DefaultCredentialStoreFactory());
        this.add(new DefaultDiscoveryFactory());
        this.add(new DefaultTestFactory());
    }

}
