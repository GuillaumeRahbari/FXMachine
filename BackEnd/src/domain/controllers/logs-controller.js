/**
 * Created by Quentin on 1/18/2016.
 */

var logGateway = require('../../data/logs-gateway'),
    userFinder = require('../../data/user-finder'),
    logs = require("../Logs");

/**
 * This function will retrieve the information about the client to put in a log that will be push in
 * the logs database
 *
 * @param   client_id       {uuid}      _id of client generate by mongodb
 * @param   data            {string}    this data will say if the user connected or disconnected of the
 *                                      application
 */
function connectionLog(client_id, data) {
    console.log("test : " + client_id)
    userFinder.findUserWithId(client_id, function(err, result) {
        if(err) {
            console.log("Error witht the sign out log");
            // we dont treat this case because the client dont need to know if there is an error and the information important
        } else {
            var myLog = new logs.Logs(result.email, new Date().getTime(), data);
            myLog.LogToJson(function(err, res) {
               if(err) {
                   console.log(err);
               } else {
                   logGateway.saveLog(res, function(res, err) {
                       if(err) {
                           console.log(err);
                       }
                   });
               }
            });
        }
    });
}


exports.connectionLog = connectionLog;
