/**
 * Created by Quentin on 1/18/2016.
 */
"use strict"

class Pedal {
    constructor(filters, input, output) {
        this._input = input;
        this._output = output;
        this._filters = filters;
        this._rate = 0;
        this._comments = [];
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

    pedalFromJSON(json, callback) {
        // TODO wait for pedal
    }

    pedalToJSON(callback) {
        // TODO : wait for pedal
    }
}