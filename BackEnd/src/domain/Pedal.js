/**
 * Created by Quentin on 1/18/2016.
 */

"use strict";

class Pedal {
    constructor(filters, input, output, rate, comments, ratersCounter) {
        this._input = input;
        this._output = output;
        this._filters = filters;
        this._ratersCounter = ratersCounter;

        if(typeof rate == "undefined") {
            this._rate = 0;
        } else {
            this._rate = rate;
        }
        if(typeof comments == "undefined") {
            this._comments = [];
        } else {
            this._comments = comments;
        }
    }

    get filters() {
        return this._filters;
    }

    get input() {
        return this._input
    }

    get output() {
        return this._output
    }

    get rate() {
        return this._rate;
    }

    get comments() {
        return this._comments;
    }

    pedalToJSON(callback) {
        if(!(this._filters && this._input && this._output)) {
            callback(new Error("Missing attribute in pedal"), null);
        } else {
            callback(null, {
                _filters: this._filters,
                _input: this._input,
                _output: this._output,
                _comments: this._comments,
                _rate: this._rate
            });
        }
    }
}

function JsonToPedal(json, callback) {
    if(!(json._filters && json._input && json._output)) {
        callback(new Error("Bad json"), null);
    } else {
        var comments = [];
        var rate = 0;
        var ratersCounter = 0;

        if(!(json._ratersCounter)) {
            ratersCounter = json._ratersCounter;
        }
        if(!(json._comments)) {
            comments = json._comments;
        }
        if(!(json._rate)) {
            rate = json._rate;
        }
        var pedal = new Pedal(json._filters, json._input, json._output, rate, comments, ratersCounter);
        callback(null, pedal);
    }
}

exports.JsonToPedal = JsonToPedal;
exports.Pedal = Pedal;