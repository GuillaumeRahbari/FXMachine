/**
 * Created by grahbari on 21/12/2015.
 */

var assert = require('assert');
var http = null;

describe('Testing express.js', function() {

    it('should check that the http var is null', function () {
        assert.equal(http, null, 'should be equal');
    });

    it('should initialize the http var', function () {
        http = require('../../app/core/core.js').getHttp();
        assert.notEqual(http, null, 'should be not null');
    });
});