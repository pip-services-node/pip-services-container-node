import { ConfigParams } from 'pip-services-commons-node';

import { ComponentConfig } from './ComponentConfig';

export class ContainerConfig extends Array<ComponentConfig> {

    public constructor(components?: ComponentConfig[]) {
        super();

        if (components != null)
            super.push(...components);
    }

    public static fromValue(value: any): ContainerConfig {
        let config = ConfigParams.fromValue(value);
        return ContainerConfig.fromConfig(config);
    }

    public static fromConfig(config: ConfigParams): ContainerConfig {
        let result = new ContainerConfig();
        if (config == null) return result;

        let names = config.getSectionNames();
        for (var i = 0; i < names.length; i++) {
            let componentConfig = config.getSection(names[i]);
            result.push(ComponentConfig.fromConfig(componentConfig));
        }

        return result;
    }
		
}