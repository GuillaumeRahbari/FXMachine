/**
 * Created by grahbari on 21/12/2015.
 */

/*
 * Notre core module
 */

var http = null;
var express = require('express');
var app = express();

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

module.exports = {getHttp : getHttp, app: app, express : express};