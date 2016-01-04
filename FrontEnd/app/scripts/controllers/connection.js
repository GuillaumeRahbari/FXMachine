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

      $scope.signin = function (user) {
          console.log('cc');
          UserSrv.signin(user).then(
              function (data) {
                  console.log(data);
              },
              function (error) {
                  console.log(error);
              }
          )
      };

  });
