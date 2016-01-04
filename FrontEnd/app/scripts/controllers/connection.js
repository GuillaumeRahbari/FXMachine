'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ConnectionCtrl
 * @description
 * # ConnectionCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ConnectionCtrl', [function (UserSrv) {

      this.signin = function (user) {
          UserSrv.signin(user).then(
              function (data) {
                  console.log(data);
              },
              function (error) {
                  console.log(error);
              }
          )
      }

  }]);
