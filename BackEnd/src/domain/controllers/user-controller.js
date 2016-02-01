/**
 * Created by Quentin on 1/14/2016.
 */
var userFinder = require('../../data/user-finder'),
    usergateway = require("../../data/user-gateway"),
    async = require("async"),
    pedalFinder = require('../../data/pedal-finder');

function pedalRetriever(userId, callback) {
    userFinder.getUserPedal(userId, function(pedalList) {
        var pedals = [];
        console.log("olo");
        async.each(pedalList, function iterator (item, callbackIter) {
            console.log(item);
            pedals.push(item);
            callbackIter(null);
        }, function join (err) {
            if(err) {
                callback(err);
            } else {
                callback(pedals);
            }
        });
    });
}

function updateUserPedals(userId, pedals ,callback) {
    userFinder.findUserWithId(userId, function(err, res) {
        if(err) {
            callback(err, null);
        } else {
            res._pedals = pedals;
            usergateway.updateUser(res, function(err, res) {
                if(err) {
                    callback(err, null);
                }
            });
        }
    });
}

exports.updateUserPedals = updateUserPedals;
exports.pedalRetriever = pedalRetriever;