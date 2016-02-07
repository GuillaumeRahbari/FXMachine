/**
 * Created by Quentin on 2/3/2016.
 */

var pedalFinder = require("../../data/pedal-finder"),
    pedalGateway = require("../../data/pedal-gateway");


/**
 *
 * @param pedalId
 * @param pedalNote
 * @param callback
 */
function updatePedalNote(pedalId, pedalNote, callback) {
    pedalFinder.myfindOne(pedalId, function(err, res) {
       if(err) {
           callback(err, null);
       } else {
           var note =
           pedalGateway.updatePedalNote(pedalId, res[0]._note, function(error, result) {
                if(error) {
                    callback(err,null);
                } else {
                    callback(null, result);
                }
           });
       }
    });
}

function updatePedalComment(pedalId, comment, callback) {

}

exports.updatePedalComment = updatePedalComment;
exports.updatePedalNote = updatePedalNote;
