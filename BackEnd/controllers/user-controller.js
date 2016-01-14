/**
 * Created by Quentin on 1/14/2016.
 */
var userFinder = require('../data/user-finder'),
    pedalFinder = require('../data/pedal-finder');


function pedalRetriever(userId, callback) {
    userGateway.getUserPedal(userId, function(pedalList) {
        var result = [];
        for(var pedal in pedalList) {
            (function(pedal) {
                pedalFinder.myfindOne(pedal._id, function(repsonse) {
                    result.push(repsonse);
                })
            })(pedal)
        }
    });
}


exports.pedalRetriever = pedalRetriever;