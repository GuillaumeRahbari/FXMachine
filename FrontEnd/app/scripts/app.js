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
                    templateUrl : 'views/fxMachineV3.html',
                    controller  : 'fxMachineCtrl',
                    controllerAs: 'fxmachine'
                })
                .when('/connection', {
                    templateUrl : 'views/connection.html',
                    controller  : 'ConnectionCtrl',
                    controllerAs: 'connection'
                })
                .when('/profil', {
                    templateUrl : 'views/profil.html',
                    controller  : 'ProfilCtrl',
                    controllerAs: 'profil'
                })
                .when('/pedal', {
                    templateUrl : 'views/pedal.html',
                    controller  : 'PedalCtrl',
                    controllerAs: 'pedal'
                })
                .when('/home', {
                    templateUrl : 'views/home.html',
                    controller  : 'HomeCtrl',
                    controllerAs: 'home'
                })
                .when('/pedal/:pedalId', {
                    templateUrl : 'views/pedal.html',
                    controller  : 'PedalCtrl',
                    controllerAs: 'pedal',
                    resolve     : {
                        'pedal': function (PedalSrv, $route) {
                            return PedalSrv.getPedal($route.current.params.pedalId).then(
                                function (data) {
                                    return data.data;
                                },
                                function (error) {
                                    return error;
                                }
                            )
                        }
                    }
                })
                .when('/users', {
                    templateUrl : 'views/users.html',
                    controller  : 'UsersCtrl',
                    controllerAs: 'users'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        }
    )

    .run(['$rootScope', '$cookies', function ($rootScope, $cookies) {


        $rootScope.$on('$routeChangeStart', function () {
            // On essaye de récupérer le cookie de connection.
            if ($cookies.get('userId') !== undefined) {
                $rootScope.header = 'connected';
            }
            // Sinon on propose le header où on peut se connecter.
            else {
                $rootScope.header = 'default';


            }
        });
    }]);
