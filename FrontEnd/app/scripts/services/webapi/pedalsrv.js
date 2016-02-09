'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.PedalSrv
 * @description
 * # PedalSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
       .factory('PedalSrv', function ($cookies, $http, $rootScope, constants) {

           var url = constants.backendUrl + 'user/' + $cookies.get('userId') + '/pedals';

           return {
               /**
                * Return all pedals of the user.
                * @returns {HttpPromise}
                */
               getAllPedals: function (userId) {
                   return $http({
                       method : 'GET',
                       url    : constants.backendUrl + 'user/' + userId + '/pedals/all',
                       headers: {'Content-Type': 'application/json'}
                   });
               },

               /**
                * Create a pedal.
                * @param {Pedal} pedal - The pedal to add.
                */
               putPedal: function (pedal) {
                   $http({
                       method : 'POST',
                       url    : url + '/create',
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
               getPedal: function (userId, pedalId) {
                   return $http({
                       method : 'GET',
                       url    : constants.backendUrl + 'user/' + userId + '/pedals/' + pedalId,
                       headers: {'Content-Type': 'application/json'}
                   });
               },

               /**
                * Update a pedal.
                * @param {Pedal} pedal - The pedal to update.
                */
               updatePedal: function (pedal, pedalId) {
                   pedal._id = pedalId;

                   console.log("sedal sent to ssrver : " + JSON.stringify(pedal));
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
               },

               commentPedal: function (comment, pedalId) {
                   $http({
                       method : 'POST',
                       url    : url + '/' + pedalId + '/comments',
                       data   : {_comments: comment},
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

               ratePedal: function (rate, pedalId) {
                   $http({
                       method : 'POST',
                       url    : url + '/' + pedalId + '/rate',
                       data   : {_rate: rate},
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
