'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.UserSrv
 * @description
 * # UserSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('UserSrv', function ($cookieStore, $location, $http) {
    return {
        /**
         * This function register asynchronously a user.
         * This function returns a promise.
         * @example Here is how to use it :
         * UserSrv.subscribe(user).then(
         *    // Success callback
         *    function (data) {
           *      console.log(data);
           *    },
         *    // Error callback.
         *    function (response) {
           *      console.log(response);
           *    }
         *  );
         *
         * @param {Object} user - The user informations.
         * @returns {Promise.<T>} Returns the $http promise with :
         * <ul>
         *     <li>either the success status</li>
         *     <li>either an error</li>
         * </ul>
         */
        subscribe: function (user) {
            return $http({
                method: 'PUT',
                url: 'http://localhost:3000/user/subscription',
                data: user,
                headers: {'Content-Type': 'application/json'}
            }).then(
                // success
                function (response) {
                    $cookieStore.put('userId', response.data.id);
                    return response.data;
                },
                //error
                function (error) {
                    console.log('cc');
                    return error.status;
                }
            );
        },

        /**
         * This function login asynchronously a user.
         * This function returns a promise.
         * @example Here is how to use it :
         * UserSrv.login(user).then(
         *    // Success callback
         *    function (data) {
           *      console.log(data);
           *    },
         *    // Error callback.
         *    function (response) {
           *      console.log(response);
           *    }
         *  );
         *
         * @param {Object} user - The user informations.
         * @returns {Promise.<T>} Returns the $http promise with :
         * <ul>
         *     <li>either the success status</li>
         *     <li>either an error</li>
         * </ul>
         */
        login: function (user) {
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/user/signin',
                data: user,
                headers: {'Content-Type': 'application/json'}
            }).then(
                // success
                function (response) {
                    $cookieStore.put('userId', response.data.id);
                    return response.data;
                },
                //error
                function (error) {
                    console.log('cc');
                    return error.status;
                }
            );
        },

        /**
         * This function disconnect asynchronously a user.
         * This function returns a promise.
         * @example Here is how to use it :
         * UserSrv.logout().then(
         *    // Success callback
         *    function (data) {
           *      console.log(data);
           *    },
         *    // Error callback.
         *    function (response) {
           *      console.log(response);
           *    }
         *  );
         *
         * @returns {Promise.<T>} Returns the $http promise with :
         * <ul>
         *     <li>either the success status</li>
         *     <li>either an error</li>
         * </ul>
         */
        logout: function () {
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/user/signout',
                data: {id : $cookieStore.get('userId')},
                headers: {'Content-Type': 'application/json'}
            }).then(
                // success
                function (response) {
                    $cookieStore.remove('userId');
                    return response.data;
                },
                //error
                function (error) {
                    return error.status;
                }
            );
        }
    };
  });
