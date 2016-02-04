'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.PedalSrv
 * @description
 * # PedalSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
       .factory('PedalSrv', function ($cookies, $http, $rootScope) {

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
                * Create a pedal.
                * @param {Pedal} pedal - The pedal to add.
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
                           $rootScope.$broadcast('updatePedals');
                       },
                       function (error) {
                           console.log(error);
                       }
                   )
               },

               /**
                * Getter of a pedal.
                * @param {int} pedalId - The pedal id.
                * @returns {HttpPromise}
                */
               getPedal: function (pedalId) {
                   return $http({
                       method : 'GET',
                       url    : url + '/' + pedalId,
                       headers: {'Content-Type': 'application/json'}
                   });
               },

               /**
                * Update a pedal.
                * @param {Pedal} pedal - The pedal to update.
                */
               updatePedal: function (pedal) {
                   $http({
                       method : 'PUT',
                       url    : url + '/' + pedal._id,
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
               }
           };
       });
