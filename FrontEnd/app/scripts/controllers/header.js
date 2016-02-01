'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
       .controller('HeaderCtrl', function (UserSrv, $location, $rootScope) {

           /**
            * This functions is here to logout.
            */
           this.logout = function () {
               UserSrv.logout();
           };

       });
