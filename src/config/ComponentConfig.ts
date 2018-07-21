import { Descriptor } from 'pip-services-commons-node';
import { TypeDescriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';

export class ComponentConfig {

    public constructor(descriptor?: Descriptor, type?: TypeDescriptor, config?: ConfigParams) {
        this.descriptor = descriptor;
        this.type = type;
        this.config = config;
    }

	public descriptor: Descriptor = null;
	public type: TypeDescriptor = null;
	public config: ConfigParams = null;

    public static fromConfig(config: ConfigParams): ComponentConfig {
        var descriptor = Descriptor.fromString(config.getAsNullableString("descriptor"));
        var type = TypeDescriptor.fromString(config.getAsNullableString("type"));

        if (descriptor == null && type == null)
            throw new ConfigException(null, "BAD_CONFIG", "Component configuration must have descriptor or type");

        return new ComponentConfig(descriptor, type, config);
    }
		
}