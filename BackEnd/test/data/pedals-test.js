/**
 * Created by Quentin on 1/25/2016.
 */
"use strict";

var assert = require("assert"),
    pedalsFinder = require("../../src/data/pedal-finder"),
    pedalGateway = require("../../src/data/pedal-gateway"),
    pedalClass = require("../../src/domain/Pedal");

suite("Pedal data manager test suite", function() {
   setup("Set up of the suite", function() {
       pedalGateway.savePedal("test", function(err, result) {
           if(err) {
               throw err;
           }
       })
   });

    test("Save & finder pedal test", function() {
       pedalsFinder.myfindOne("test", function(err, result) {
           assert.equal("test", result);
       })
    });

    test("Delete pedal test", function() {
        pedalGateway.deletePedal("test", function(err, res) {
            if(err) {
                throw err;
            }
        });

        pedalsFinder.myfindOne("test", function(err, res) {
            assert.ifError(err);
        });
    })

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