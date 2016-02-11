/**
 * Created by Quentin on 1/25/2016.
 */

/**
 * Created by Quentin on 1/25/2016.
 */
"use strict";

var assert = require('assert'),
    userGateway = require("../../src/data/user-gateway"),
    userFinder = require("../../src/data/user-finder"),
    core = require("../../app/core/core");


suite('User data manager test suite', function() {


    suiteSetup(function(done) {
        core.dbConnection(done);
    });

    var user = {
        _email : "coucou"
    }

    var userId;

    setup("Set up of the suite", function(){
        userGateway.createUser(user, function(err, result) {
            if(err) {
                throw err;
            }
            userId = result._id;
        })
    });


    test('Save & Finder user test', function() {
        userFinder.findOne(user, function(err, result) {
            assert.equal("test", result);
        });
    });

    test("Delete user test", function() {
        userGateway.deleteUser(user, function(err, res) {
            if(err) {
                throw err;
            }
        });

        userFinder.findOne(user, function(err, res) {
            assert.ifError(err);
        });
    })
});