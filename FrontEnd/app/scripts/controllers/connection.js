'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ConnectionCtrl
 * @description
 * # ConnectionCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
       .controller('ConnectionCtrl', function (UserSrv, $location) {

           /**
            * This function is here to subscribe.
            * @param {Object} user - The user object that contains an email and a password.
            */
           this.subscribe = function (user) {
               UserSrv.subscribe(user);
           };

           /**
            * This function is here to login
            * @param {Object} user - The user object that contains an email and a password.
            */
           this.login = function (user) {
               UserSrv.login(user);
           };

       });
