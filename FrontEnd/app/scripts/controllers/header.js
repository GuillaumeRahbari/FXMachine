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

      this.logout = function () {
          UserSrv.logout().then(
              function (data) {
                  $rootScope.header = 'default';
                  $location.path('/connection');
              },
              function (error) {
                  console.log(error);
              }
          )
      }

  });
