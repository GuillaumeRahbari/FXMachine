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
        templateUrl: 'views/fxMachineV3.html',
        controller: 'fxMachineCtrl',
        controllerAs: 'fxmachine'
      })
      .when('/connection', {
        templateUrl: 'views/connection.html',
        controller: 'ConnectionCtrl',
        controllerAs: 'connection'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
  )

.run(['$rootScope', '$cookieStore', function($rootScope, $cookieStore) {

    $rootScope.header = 'default';

    $rootScope.$on( '$routeChangeStart', function() {
        // On essaye de récupérer le cookie de connection.
        if($cookieStore.get('userId') !== undefined) {
            console.log('cookie ok');
            $rootScope.header = 'connected';
        }
        // Sinon on propose le header où on peut se connecter.
        else {
            console.log('cookie not ok');
            $rootScope.header = 'default';
        }
    });
}]);
