/**
 * Created by Quentin on 1/25/2016.
 */
"use strict";

var assert = require("assert"),
    pedals = require("../../src/domain/Pedal");


suite("Logs domain test suite", function() {
    var pedal;
    var json;

    setup("Set up of the suite", function(){
        pedal = new pedals.Pedal("test", "test", "test", 0, [], 0);
        json = {
            _filters: "test",
            _input: "test",
            _output: "test",
            _ratersCounter: 0,
            _rate: 0,
            _comments: []
        }
    });

    test("Pedal to JSON test", function() {
        pedal.pedalToJSON(function(err, result) {
            assert.deepEqual({
                _filters: "test",
                _input: "test",
                _output: "test",
                _comments: [],
                _rate: 0
            }, result)
        })
    });

    test("Json to Pedal test", function() {
       pedals.JsonToPedal(json , function(err, res) {
           console.log(json);
           console.log(res);
            assert.deepEqual(pedal, res);
       });
    });

});