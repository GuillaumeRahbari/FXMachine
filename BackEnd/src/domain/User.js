/**
 * Created by Quentin on 1/18/2016.
 */

"use strict";

/**
 * This class represent the user in our model.
 */
class User {

    /**
     *
     * @param email
     * @param password
     * @param pedals
     */
    constructor(email, password, pedals) {
        this._email = email;
        this._password = password;
        if(typeof pedals == "undefined") {
            this._pedals = [];
        } else {
            this._pedals = pedals;
        }
    }


    /**
     * This function create a JSON with {this} user.
     *
     * @param           callback        {function}      This function got two parameters, the first one is for error handling.
     *                                                  An error is send if the email or the password is not defined.
     * @constructor
     */
    UserToJson(callback) {
        if(typeof this._email == 'undefined' || typeof this._password == 'undefined') {
            callback(new Error( "Bad User without email or password"), null);
        } else if(this._pedals.length == 0 || typeof this.pedals == 'undefined') {
            var json = {
                email: this._email,
                password: this._password,
                pedals: []
            }
            callback(null, json);
        } else {
            var json = {
                email: this._email,
                password: this._password,
                pedals: this._pedals
            }
            callback(null, json);
        }
    }


    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get pedals() {
        return this._pedals;
    }

    set email(email) {
        this._email = email;
    }

    set password(password) {
        this._password = password;
    }

    set pedals(pedals) {
        this._pedals = pedals;
    }
}

/**
 * This function will create a user with a given json. If the json have this forme :
 *  {
     *      email: "email@email.test",
     *      password: "password",
     *  }
 *
 *  or this form :
 *  {
     *      email: "mail@mail.test",
     *      password: "password",
     *      pedals: [pedal1, pedals2, ...]
     *  }
 *
 * @param       json        {json}      The json that will be used to create the user
 * @param       callback    {function}  The callback that will return if the creation of the user is a success or not.
 */
function JsonToUser(json, callback) {
    var user;
    if(typeof json.email == 'undefined' || typeof json.password == 'undefined') {
        callback("Bad json", null);
    } else if(typeof json.pedals !== 'undefined') {
        user = new User(json.email, json.password, json.pedals);
    } else {
        user = new User(json.email, json.password);
    }
    callback(null, user);
}


exports.JsonToUser = JsonToUser;
exports.User = User;