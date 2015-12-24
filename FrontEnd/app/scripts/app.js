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
      .when('/', {
        templateUrl: 'views/fxMachineV1.html',
        controller: 'fxMachineCtrl',
        controllerAs: 'machine'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
