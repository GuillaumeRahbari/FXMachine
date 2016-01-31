'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.PedalSrv
 * @description
 * # PedalSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
       .factory('PedalSrv', function ($cookies) {

           var url = 'http://localhost:3000/user/' + $cookies.get('userId') + '/pedals';

           return {
               /**
                * Return all pedals of the user.
                * @returns {HttpPromise}
                */
               getAllPedals: function () {
                   return $http({
                       method : 'GET',
                       url    : url + '/all',
                       headers: {'Content-Type': 'application/json'}
                   });
               }
           };
       });
