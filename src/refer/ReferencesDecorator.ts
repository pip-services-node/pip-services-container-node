/** @module refer */
import { IReferences } from 'pip-services-commons-node';

export class ReferencesDecorator implements IReferences {

	public constructor(baseReferences: IReferences, parentReferences: IReferences) {
        this.baseReferences = baseReferences != null ? baseReferences : parentReferences;
        this.parentReferences = parentReferences != null ? parentReferences : baseReferences;
    }

	public baseReferences: IReferences;
	public parentReferences: IReferences;

	public put(locator: any, component: any): any {
		this.baseReferences.put(locator, component);
	}
	
	public remove(locator: any): any {
		return this.baseReferences.remove(locator);
	}

	public removeAll(locator: any): any[] {
		return this.baseReferences.removeAll(locator);
	}

    public getAllLocators(): any[] {
		return this.baseReferences.getAllLocators();
	}

	public getAll(): any[] {
		return this.baseReferences.getAll();
	}
		
    public getOneOptional<T>(locator: any): T {
    	try {
	        let components = this.find<T>(locator, false);
            return components.length > 0 ? components[0] : null;
    	} catch (ex) {
    		return null;
    	}
    }

    public getOneRequired<T>(locator: any): T {
        let components = this.find<T>(locator, true);
        return components.length > 0 ? components[0] : null;
    }

    public getOptional<T>(locator: any): T[] {
    	try {
    		return this.find<T>(locator, false);
    	} catch (ex) {
            return [];
    	}
    }

    public getRequired<T>(locator: any): T[] {
        return this.find<T>(locator, true);
    }

	public find<T>(locator: any, required: boolean): T[] {
		return this.baseReferences.find<T>(locator, required);
    }

}
