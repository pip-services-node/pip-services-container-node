import { IReferences } from 'pip-services-commons-node';
import { Referencer } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';

import { ReferencesDecorator } from './ReferencesDecorator'

export class LinkReferencesDecorator extends ReferencesDecorator implements IOpenable {
    private _opened: boolean = false;

    public constructor(baseReferences: IReferences, parentReferences: IReferences) {
    	super(baseReferences, parentReferences);
    }

    public isOpen(): boolean {
        return this._opened;
    }

    public open(correlationId: string, callback?: (err: any) => void): void {
        if (!this._opened) {
            this._opened = true;
            let components = this.getAll();
            Referencer.setReferences(this.parentReferences, components);
        }

        if (callback) callback(null);
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        if (this._opened) {
            this._opened = false;
            let components = this.getAll();
            Referencer.unsetReferences(components);
        }

        if (callback) callback(null);
    }

    public put(locator: any, component: any): any {
        super.put(locator, component);

        if (this._opened)
            Referencer.setReferencesForOne(this.parentReferences, component);
    }

    public remove(locator: any): any {
        let component = super.remove(locator);

        if (this._opened)
            Referencer.unsetReferencesForOne(component);

        return component;
    }

    public removeAll(locator: any): any[] {
        let components = super.removeAll(locator);

        if (this._opened)
            Referencer.unsetReferences(components);

        return components;
    }
}
