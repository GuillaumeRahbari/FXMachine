'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.UserSrv
 * @description
 * # UserSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
       .factory('UserSrv', function ($cookies, $location, $http, ExpireDate, $rootScope) {
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
                       url    : 'http://localhost:3000/user/subscription',
                       data   : user,
                       headers: {'Content-Type': 'application/json'}
                   }).then(
                       // success
                       function (response) {
                           $cookies.put('userId', response.data.id, {expires: exp});
                           $location.path('/profil');
                       },
                       //error
                       function (error) {
                           console.log('cc');
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
                       url    : 'http://localhost:3000/user/signin',
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
                       url    : 'http://localhost:3000/user/signout',
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
               }
           };
       });