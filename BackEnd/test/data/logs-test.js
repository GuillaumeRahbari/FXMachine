/**
 * Created by Quentin on 1/25/2016.
 */
"use strict";

var assert = require('assert'),
    logsGateway = require("../../src/data/logs-gateway"),
    logsFinder = require("../../src/data/logs-finder");

suite('Log Gateway test suite', function() {
    setup("Set up of the suite", function(){
        logsGateway.saveLog("test", function(err, result) {
            if(err) {
                console.log("init failed")
            } else {
                console.log("init ok")
            }
        })
    });


    test('Save & Finder log test', function() {
        logsFinder.myFindOne("test", function(err, result) {
           assert.equal("test", result);
        });
    });

    test("Delete log test", function() {
        logsGateway.deleteLog("test", function(err, res) {
           if(err) {
               throw err;
           }
        });

        logsFinder.myFindOne("test", function(err, res) {
           assert.ifError(err);
        });
    })
});