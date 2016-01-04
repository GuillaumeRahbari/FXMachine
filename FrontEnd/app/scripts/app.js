'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Main module of the application.
 */
angular
  .module('frontEndApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/fxmachine', {
        templateUrl: 'views/fxMachineV1.html',
        controller: 'fxMachineCtrl',
        controllerAs: 'machine'
      })
      .when('/connection', {
        templateUrl: 'views/connection.html',
        controller: 'ConnectionCtrl',
        controllerAs: 'connection'
      })
      .otherwise({
        redirectTo: '/connection'
      });
  }
  )

.run(['$location', '$cookieStore', function($location, $cookieStore) {
        // On essaye de récupérer le cookie de connection.
        if($cookieStore.get('userId') !== undefined) {
            $location.path('/fxmachine');
        }
}]);
