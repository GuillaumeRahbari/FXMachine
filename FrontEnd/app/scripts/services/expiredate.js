'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.ExpireDate
 * @description
 * # ExpireDate
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('ExpireDate', function () {
    return {
        /**
         * This function returns a expiration date, 7 days from now.
         * @returns {Date} The date 7 days later.
         */
        expireDate : function () {
            var now = new Date(),
                // this will set the expiration to 7 jours
                exp = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7);
            return exp;
        }
    };
  });
