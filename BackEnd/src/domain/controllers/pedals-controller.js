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
           if(!(res[0]._ratersCounter)) {
               console.log(res[0]);
               var note = pedalNote + (res[0]._rate * res[0]._ratersCounter);
                console.log(note);

               pedalGateway.updatePedalNote(pedalId, note, function (error, result) {
                   if (error) {
                       callback(err, null);
                   } else {
                       callback(null, result);
                   }
               });
           } else {
               callback(err, null);
           }
       }
    });
}

function updatePedalComment(pedalId, comment, callback) {
    pedalFinder.myfindOne(pedalId, function(err, res){
        if(err) {
            callback(err, null);
        } else {
            var pedal = res[0];

            var comments = pedal._comments;
            comments.push(comment);

            pedalGateway.updatePedalComments(pedal._id, comments ,function(error, response){
                if(err) {
                    callback(error, null);
                } else {
                    callback(null, response);
                }
            });
        }
    });
}

exports.updatePedalComment = updatePedalComment;
exports.updatePedalNote = updatePedalNote;
