/**
 * Created by Quentin on 1/14/2016.
 */
var userFinder = require('../../data/user-finder'),
    userGateway = require("../../data/user-gateway"),
    async = require("async"),
    user = require("../User"),
    pedalFinder = require('../../data/pedal-finder');

function pedalRetriever(userId, callback) {
    userFinder.getUserPedal(userId, function(pedalList) {
        var pedals = [];
        async.each(pedalList, function iterator (item, callbackIter) {
            pedalFinder.myfindOne(item._id, function(err, res) {
                pedals.push(res);
                callbackIter(err);
            });
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
            res._pedals.push(pedals[0]);
            userGateway.updateUser(res, function(error, response) {
                if(error) {
                    callback(error, null);
                } else {
                    callback(null, response);
                }
            });
        }
    });
}

function retrieveAllUser(callback) {
    userFinder.findAllUser(function(err, res) {
        if(err) {
            callback(err, null);
        } else {
            callback(null, res)
        }
    })
}


exports.updateUserPedals = updateUserPedals;
exports.pedalRetriever = pedalRetriever;
exports.retrieveAllUser = retrieveAllUser;