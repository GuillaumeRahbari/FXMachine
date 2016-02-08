'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.UserSrv
 * @description
 * # UserSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
       .factory('UserSrv', function ($cookies, $location, $http, ExpireDate, $rootScope, constants) {
           return {
               /**
                * This function register asynchronously a user.
                * This function returns a promise.
                * @example Here is how to use it :
                * UserSrv.subscribe(user);
                *
                * @param {Object} user - The user informations.
                * @returns {Promise.<T>} Returns the $http promise with :
                * <ul>
                *     <li>either the success status</li>
                *     <li>either an error</li>
                * </ul>
                */
               subscribe: function (user) {
                   var exp = ExpireDate.expireDate();
                   $http({
                       method : 'PUT',
                       url    : constants.backendUrl + 'user/subscription',
                       data   : user,
                       headers: {'Content-Type': 'application/json'}
                   }).then(
                       // success
                       function (response) {
                           $cookies.put('userId', response.data._id, {expires: exp});
                           $location.path('/profil');
                       },
                       //error
                       function (error) {
                           console.log(error);
                           $location.path('/connection');
                       }
                   );
               },

               /**
                * This function login asynchronously a user.
                * This function returns a promise.
                * @example Here is how to use it :
                * UserSrv.login(user);
                *
                * @param {Object} user - The user informations.
                * @returns {Promise.<T>} Returns the $http promise with :
                * <ul>
                *     <li>either the success status</li>
                *     <li>either an error</li>
                * </ul>
                */
               login: function (user) {
                   var exp = ExpireDate.expireDate();
                   $http({
                       method : 'POST',
                       url    : constants.backendUrl + 'user/signin',
                       data   : user,
                       headers: {'Content-Type': 'application/json'}
                   }).then(
                       // success
                       function (response) {
                           $cookies.put('userId', response.data[0]._id, {expires: exp});
                           $location.path('/profil');
                       },
                       //error
                       function (error) {
                           console.log(error.status);
                           $location.path('/connection');
                       }
                   );
               },

               /**
                * This function disconnect asynchronously a user.
                * This function returns a promise.
                * @example Here is how to use it :
                * UserSrv.logout();
                *
                * @returns {Promise.<T>} Returns the $http promise with :
                * <ul>
                *     <li>either the success status</li>
                *     <li>either an error</li>
                * </ul>
                */
               logout: function () {
                   return $http({
                       method : 'POST',
                       url    : constants.backendUrl + 'user/signout',
                       data   : {_id: $cookies.get('userId')},
                       headers: {'Content-Type': 'application/json'}
                   }).then(
                       // success
                       function (response) {
                           $cookies.remove('userId');
                           $rootScope.header = 'default';
                           $location.path('/connection');
                           return response.data;
                       },
                       //error
                       function (error) {
                           $location.path('/');
                           return error.status;
                       }
                   );
               },

               /**
                * This function gets all users.
                * This function returns a promise.
                * @returns {HttpPromise} An http promise.
                */
               getAll: function () {
                   return $http({
                       method : 'GET',
                       url    : constants.backendUrl + 'user/all',
                       headers: {'Content-Type': 'application/json'}
                   });
               }
           };
       });
