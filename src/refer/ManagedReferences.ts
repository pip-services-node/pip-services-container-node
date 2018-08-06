/** @module refer */
import { IOpenable } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { ReferencesDecorator } from './ReferencesDecorator';
import { BuildReferencesDecorator } from './BuildReferencesDecorator';
import { LinkReferencesDecorator } from './LinkReferencesDecorator';
import { RunReferencesDecorator } from './RunReferencesDecorator';

export class ManagedReferences extends ReferencesDecorator implements IOpenable {
    protected _references: References;
    protected _builder: BuildReferencesDecorator;
    protected _linker: LinkReferencesDecorator;
    protected _runner: RunReferencesDecorator;

    public constructor(tuples: any[] = null) {
        super(null, null);

        this._references = new References(tuples);
        this._builder = new BuildReferencesDecorator(this._references, this);
        this._linker = new LinkReferencesDecorator(this._builder, this);
        this._runner = new RunReferencesDecorator(this._linker, this);

        this.baseReferences = this._runner;
    }

    public isOpen(): boolean {
        return this._linker.isOpen() && this._runner.isOpen();
    }
    
    public open(correlationId: string, callback?: (err: any) => void): void {
        this._linker.open(correlationId, (err) => {
            if (err == null)
                this._runner.open(correlationId, callback);
            else if (callback) callback(err);
        });
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        this._runner.close(correlationId, (err) => {
            if (err == null)
                this._linker.close(correlationId, callback);
            else if (callback) callback(err);
        });
    }

	public static fromTuples(...tuples: any[]): ManagedReferences {
		return new ManagedReferences(tuples);
	}
}
