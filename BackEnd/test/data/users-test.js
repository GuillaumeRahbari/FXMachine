/**
 * Created by Quentin on 1/25/2016.
 */

/**
 * Created by Quentin on 1/25/2016.
 */
"use strict";

var assert = require('assert'),
    userGateway = require("../../src/data/user-gateway"),
    userFinder = require("../../src/data/user-finder");

suite('User data manager test suite', function() {
    setup("Set up of the suite", function(){
        userGateway.createUser("test", function(err, result) {
            if(err) {
                throw err;
            }
        })
    });


    test('Save & Finder user test', function() {
        userFinder.findOne("test", function(err, result) {
            assert.equal("test", result);
        });
    });

    test("Delete user test", function() {
        userGateway.deleteUser("test", function(err, res) {
            if(err) {
                throw err;
            }
        });

        userFinder.findOne("test", function(err, res) {
            assert.ifError(err);
        });
    })
});