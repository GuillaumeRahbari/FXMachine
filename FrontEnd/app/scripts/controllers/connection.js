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
          UserSrv.subscribe(user).then(
              function (data) {
                  $location.path('/profil');
              },
              function (error) {
                  console.log(error);
              }
          );
      };

      /**
       * This function is here to login
       * @param {Object} user - The user object that contains an email and a password.
       */
      this.login = function (user) {
          UserSrv.login(user).then(
              function (data) {
                  $location.path('/profil');
              },
              function (error) {
                  console.log(error);
              }
          )
      }

  });
