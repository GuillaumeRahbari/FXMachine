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
        this._pedals = pedals;
    }

    /**
     *  This constructor will create a user with the given email and password and an empty array of pedals.
     *
     * @param       email           {string}    String representing the email of the user
     * @param       password        {string}    String representing the password of the user
     */
    constructor(email, password) {
        this._email = email;
        this._password = password;
        this._pedals = [];
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
    JsonToUser(json, callback) {
        if(json.pedals == 'undefined') {
            new User(json.email, json.password);
        } else {
            new User(json.email, json.password, json.pedals);
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