'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.PedalSrv
 * @description
 * # PedalSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
       .factory('PedalSrv', function ($cookies, $http) {

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
               },

               /**
                * Save a pedal.
                * @param pedal
                */
               putPedal: function (pedal) {
                   $http({
                       method : 'PUT',
                       url    : url + '/',
                       data   : pedal,
                       headers: {'Content-Type': 'application/json'}
                   }).then(
                       function (response) {
                           console.log(response);
                       },
                       function (error) {
                           console.log(error);
                       }
                   )
               },

               /**
                * Return a pedal.
                * @param pedalId
                * @returns {HttpPromise}
                */
               getPedal: function (pedalId) {
                   return $http({
                       method : 'GET',
                       url    : url + '/' + pedalId,
                       headers: {'Content-Type': 'application/json'}
                   });
               }
           };
       });
