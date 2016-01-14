'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ConnectionCtrl
 * @description
 * # ConnectionCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ConnectionCtrl', function (UserSrv, $scope) {

      /**
       * This function is here to sign in.
       * @param {Object} user - The user object that contains an email and a password.
       */
      $scope.signin = function (user) {
          UserSrv.signin(user).then(
              function (data) {
                  console.log(data);
              },
              function (error) {
                  console.log(error);
              }
          );
      };

  });
