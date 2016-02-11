/**
 * Created by Quentin on 1/25/2016.
 */

"use strict";

var assert = require("assert"),
    pedalsFinder = require("../../src/data/pedal-finder"),
    pedalGateway = require("../../src/data/pedal-gateway"),
    pedalClass = require("../../src/domain/Pedal"),
    core = require("../../app/core/core");

suite("Pedal data manager test suite", function() {

    var pedal = {
        "_filters": [],
        "_input": [],
        "_output":  [],
        "_comments": [],
        "_rate": 0,
        "_ratersCounter": 0
    };

    var pedal2 = {
        "_filters": [],
        "_input": [],
        "_output":  [],
        "_comments": [],
        "_rate": 5,
        "_ratersCounter": 15
    };

    var pedal3 = {
        "_filters": [],
        "_input": [],
        "_output":  [],
        "_comments": [],
        "_rate": 5,
        "_ratersCounter": 1000
    };

    var id3;

    suiteSetup(function(done) {
        core.dbConnection(done);
    });


    test("Save & finder pedal test", function() {
        pedalGateway.savePedal(pedal, function(err, result) {
            if(!err) {
                throw err;
            } else {
                assert.deepEqual({ ok:1, n:1} , result.result)
            }
        });
    });

    test("Finder test", function() {
        var id;
        pedalGateway.savePedal(pedal2, function(err, res) {
            if(!err) {
                throw res;
            } else {
                id = res.ops[0]._id;
                pedalsFinder.myfindOne(id, function(err, res) {
                    if(err) {
                        console.log("Error : " + err);
                    } else {
                        assert.equal(1,2);
                    }
                })
            }
        });
    });

    test("Delete pedal test", function() {
        pedalGateway.deletePedal(id3, function(err, res) {
            if(err) {
                throw err;
            }
            assert.deepEqual({ ok:1, n:1} , result.result)
        });
    });

    test("Update pedal test", function() {
        var myPedal = new pedalClass.Pedal([], [], [], "test", undefined, undefined);
        console.log(myPedal);

        myPedal.pedalToJSON(function(err, res) {
            pedalGateway.savePedal(res, function(error, resonse) {
                if(err) {
                    throw error;
                }
            });

            pedalClass.JsonToPedal(res, function(err, res) {
                if(! err) {
                    pedalGateway.updatePedal(res, function(error, response) {
                    });
                }
            })
        });
    });
});