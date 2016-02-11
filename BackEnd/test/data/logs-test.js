/**
 * Created by Quentin on 1/25/2016.
 */
"use strict";

var assert = require('assert'),
    logsGateway = require("../../src/data/logs-gateway"),
    logsFinder = require("../../src/data/logs-finder"),
    core = require("../../app/core/core");


suite('Logs data manager test suite', function() {


    suiteSetup(function(done) {
        core.dbConnection(done);
    });

    var log = {
        "_test" : "test"
    };


    setup("Set up of the suite", function(){
        logsGateway.saveLog(log, function(err, result) {
            if(err) {
                throw err;
            }
        });
        console.log(result);
    });

/*
    test('Save & Finder log test', function() {
        logsFinder.myFindOne("test", function(err, result) {
           assert.equal("test", result);
        });
    }); */
/*
    test("Delete log test", function() {
        logsGateway.deleteLog("test", function(err, res) {
           if(err) {
               throw err;
           }
        });

        logsFinder.myFindOne("test", function(err, res) {
           assert.ifError(err);
        });
    }) */
});