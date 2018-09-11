/** @module refer */
import { IOpenable } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ReferencesDecorator } from './ReferencesDecorator';
import { BuildReferencesDecorator } from './BuildReferencesDecorator';
import { LinkReferencesDecorator } from './LinkReferencesDecorator';
import { RunReferencesDecorator } from './RunReferencesDecorator';
/**
 * Manages [[RunReferencesDecorator run]], [[LinkReferencesDecorator link]],
 * [[BuildReferencesDecorator build]], and [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html other references]].
 *
 * @see [[RunReferencesDecorator]]
 * @see [[LinkReferencesDecorator]]
 * @see [[BuildReferencesDecorator]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html References]] (in the PipServices "Commons" package)
 */
export declare class ManagedReferences extends ReferencesDecorator implements IOpenable {
    protected _references: References;
    protected _builder: BuildReferencesDecorator;
    protected _linker: LinkReferencesDecorator;
    protected _runner: RunReferencesDecorator;
    /**
     * Creates a new ManagedReferences object using the provided tuples array of
     * references.
     *
     * This constructor passes the tuples array to [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html#constructor References' constructor]],
     * the result of which is passed to [[BuildReferencesDecorator.constructor BuildReferencesDecorator's constructor]]
     * (the created "References" are passed as baseReferences and this object itself is passed as "parent references"),
     * the result of which is passed to [[LinkReferencesDecorator.constructor LinkReferencesDecorator's constructor]],
     * the result of which is passed to [[RunReferencesDecorator.constructor RunReferencesDecorator's constructor]],
     * the result of which is set as this object's base references.
     *
     * @param tuples    the references to initialize the new object with.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/refer.references.html#constructor References' constructor]] (in the PipServices "Commons" package)
     * @see [[BuildReferencesDecorator.constructor BuildReferencesDecorator's constructor]]
     * @see [[LinkReferencesDecorator.constructor LinkReferencesDecorator's constructor]]
     * @see [[RunReferencesDecorator.constructor RunReferencesDecorator's constructor]]
     *
     */
    constructor(tuples?: any[]);
    /**
     * @returns whether or not all link references were set and all run references
     *          were successfully opened.
     */
    isOpen(): boolean;
    /**
     * Sets all links references and, if they are successfully set, opens all run references.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the opening process is complete.
     *                          It will be called with an error if one is raised.
     *
     */
    open(correlationId: string, callback?: (err: any) => void): void;
    /**
     * Closes all run references and, if they are successfully closed, unsets all links references.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			(optional) the function to call when the closing process is complete.
     *                          It will be called with an error if one is raised.
     *
     */
    close(correlationId: string, callback?: (err: any) => void): void;
    /**
     * Static method for generating a ManagedReferences object using the provided
     * tuples arrays.
     *
     * @param tuples    the tuples arrays to initialize the new object with.
     *
     * @see [[constructor]]
     */
    static fromTuples(...tuples: any[]): ManagedReferences;
}
