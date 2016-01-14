/**
 * Created by Quentin on 1/14/2016.
 */
var userGateway = require('../data/user-finder');


function pedalRetriever(userId, callback) {
    userGateway.getUserPedal(userId, function(pedalList) {
        for(var pedal in pedalList) {

        }
    });
}


exports.pedalRetriever = pedalRetriever;