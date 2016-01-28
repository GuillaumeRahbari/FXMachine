/**
 * Created by Quentin on 1/25/2016.
 */

"use strict";

var assert = require("assert"),
    user = require("../../src/domain/User");


suite("User domain test suite", function() {

    var user1;

    setup("Set up of the suite", function() {
        user1 = new user.User("test1", "test1", undefined);
    });

    test("User to JSON method test", function() {
        user1.UserToJson(function(err, res) {
           assert.deepEqual({
               email: "test1",
               password: "test1",
               pedals: []
           }, res);
        });
    });

    test("Json to User method test", function() {
        user.JsonToUser(
        {
            email: "test1",
            password: "test1",
            pedals: []
        }, function(err, res){
                assert.deepEqual(res, user1);
            });
    });

});