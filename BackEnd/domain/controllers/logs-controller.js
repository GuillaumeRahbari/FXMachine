/**
 * Created by Quentin on 1/18/2016.
 */

var logGateway = require('../../data/logs-gateway'),
    userFinder = require('../../data/user-finder');

/**
 * This function will retrieve the information about the client to put in a log that will be push in
 * the logs database
 *
 * @param   client_id       {uuid}      _id of client generate by mongodb
 * @param   data            {string}    this data will say if the user connected or disconnected of the
 *                                      application
 */
function connectionLog(client_id, data) {
    userFinder.findUserWithId(client_id, function(err, result) {
        if(err == null) {
            // we dont treat this case because the client dont need to know if there is an error and the information important
        } else {

        }
    });
}


exports.connectionLog = connectionLog;
