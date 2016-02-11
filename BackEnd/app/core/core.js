/**
 * Created by grahbari on 21/12/2015.
 */

/*
 * Notre core module
 */

var http = null;
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;
var db = null;



function dbConnection(done) {
    if (db)  {
        return done();
    }
    else {
        mongoClient.connect(url, function(err, database) {
            if (err) {
                return done(err);
            } else {
                db = database;
                done()
            }
        });
    }
};


function disconnectDb(){
    if(db) {
        db.close();
    }
}



/**
 *  This function is used to connected to the Mongo database. Once the connexion is done we don't reconnect to the
 *  database.
 *
 * @returns     {*}     Singleton representing the connection to the database.
 */
function getDb(callback) {
    if(db == null) {
        mongoClient.connect(url, function(err, database) {
            if(err) {
                console.log("An error occured while connecting to the database : \n" + err);
            } else {
                db = database;
                callback(db);
            }
        });
    } else {
        callback(db);
    }
}

/**
 * Récupère la variable http pour le serveur.
 * Si c null on la définit, sinon on la créée.
 * De cette manière on a un singleton.
 * @returns {*} Le singleton définissant http.
 */
var getHttp = function() {
    if(http == null) {
        http = require('http').Server(app);
    }
    return http;
};

module.exports = {getHttp : getHttp, app: app, express : express, getDb : getDb, dbConnection : dbConnection, disconnectDb : disconnectDb};