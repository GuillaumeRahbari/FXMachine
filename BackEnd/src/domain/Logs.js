/**
 * Created by Quentin on 1/18/2016.
 */

"use strict";

class Logs {

    constructor(username, hour, status) {
        this._username = username;
        this._hour = hour;
        this._status = status;
    }

    LogToJson(callback) {
        if(!( this._hour && this._username && this._status)) {
            callback(new Error("Bad log impossible to convert in json"), null);
        } else {
            var json = {
                username: this._username,
                hour: this._hour,
                status: this._status
            }
            callback(null, json);
        }
    }

    /** Getter **/
    get username() {
        return this._username;
    }

    get hour() {
        return this._hour;
    }

    get status() {
        return this._status
    }
}


function JsonToLogs(json, callback) {
    if(!(json.username && json.hour && json.status)) {
        callback(new Error("Bad JSON, should have an username, an hour and a status paramerter"), null);
    } else {
        var log = new Logs(json.username, json.hour, json.status);
        callback(null, log);
    }
}



exports.JsonToLogs = JsonToLogs;

exports.Logs = Logs;