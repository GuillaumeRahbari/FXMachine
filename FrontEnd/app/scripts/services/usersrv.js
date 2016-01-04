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
         * UserSrv.signin(user).then(
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
        signin: function (user) {
            return $http({
                method: 'PUT',
                url: 'http://localhost:3000/subscription',
                data: user,
                headers: {'Content-Type': 'application/json'}
            }).then(
                // success
                function (response) {
                    $cookieStore.put('userId', response.data.id);
                    $location.path('/fxmachine');
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
