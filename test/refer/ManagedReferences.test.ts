let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ILogger } from 'pip-services-components-node';
import { DefaultLoggerFactory } from 'pip-services-components-node';

import { ManagedReferences } from '../../src/refer/ManagedReferences';

suite('ManagedReferences', ()=> {
    
    test('Auto Create Component', () => {
        var refs = new ManagedReferences();

        var factory = new DefaultLoggerFactory();
        refs.put(null, factory);

        var logger = refs.getOneRequired<ILogger>(new Descriptor("*", "logger", "*", "*", "*"));
        assert.isNotNull(logger);
    });    

    test('String Locator', () => {
        var refs = new ManagedReferences();

        var factory = new DefaultLoggerFactory();
        refs.put(null, factory);

        var component = refs.getOneOptional("ABC");
        assert.isNull(component);
    });

    test('Null Locator', () => {
        var refs = new ManagedReferences();

        var factory = new DefaultLoggerFactory();
        refs.put(null, factory);

        var component = refs.getOneOptional(null);
        assert.isNull(component);
    });    

});