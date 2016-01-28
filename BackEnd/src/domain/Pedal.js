/**
 * Created by Quentin on 1/18/2016.
 */
"use strict"

class Pedal {
    constructor(filters, input, output, name, rate, comments) {
        this._input = input;
        this._output = output;
        this._filters = filters;
        this._name = name;
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

    get name() {
        return this._name;
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
        if(!(this._filters && this._input && this._output && this._name)) {
            callback(new Error("Missing attribute in pedal"), null);
        } else {
            callback(null, {
                filters: this._filters,
                input: this._input,
                output: this._output,
                name: this._name,
                comments: this._comments,
                rate: this._rate
            });
        }
    }
}

function JsonToPedal(json, callback) {
    if(!(json.filters && json.input && json.output && json.name)) {
        callback(new Error("Bad json"), null);
    } else {
        var comments = [];
        var rate = 0;
        if(json.comments) {
            comments = json.comments;
        }
        if(json.rate) {
            rate = json.rate;
        }
        var pedal = new Pedal(json.filters, json.input, json.output, json.name, rate, comments);
        callback(null, pedal);
    }
}

exports.JsonToPedal = JsonToPedal;
exports.Pedal = Pedal;