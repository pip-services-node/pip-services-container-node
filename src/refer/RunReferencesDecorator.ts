/** @module refer */
import { IReferences } from 'pip-services-commons-node';
import { Opener } from 'pip-services-commons-node';
import { Closer } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';

import { ReferencesDecorator } from './ReferencesDecorator';

export class RunReferencesDecorator extends ReferencesDecorator implements IOpenable {
    public _opened: boolean = false;

    public constructor(baseReferences: IReferences, parentReferences: IReferences) {
    	super(baseReferences, parentReferences);
    }

    public isOpen(): boolean {
        return this._opened;
    }

    public open(correlationId: string, callback?: (err: any) => void): void {
        if (!this._opened) {
            let components = this.getAll();
            Opener.open(correlationId, components, (err) => {
                if (err == null)
                    this._opened = true;
                if (callback) callback(err);
            });
        } else {
            if (callback) callback(null);
        }
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        if (this._opened) {
            let components = this.getAll();
            Closer.close(correlationId, components, (err) => {
                this._opened = false;
                if (callback) callback(err);
            });
        } else {
            if (callback) callback(null);
        }
    }

    public put(locator: any, component: any): void {
        super.put(locator, component);

        if (this._opened)
            Opener.openOne(null, component, null);
    }

    public remove(locator: any): any {
        let component = super.remove(locator);

        if (this._opened)
            Closer.closeOne(null, component, null);

        return component;
    }

    public removeAll(locator: any): any[] {
        let components = super.removeAll(locator);

        if (this._opened)
            Closer.close(null, components, null);

        return components;
    }

}