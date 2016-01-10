'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.uuidGenerator
 * @description
 * # uuidGenerator
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
    .service('uuidGenerator', function () {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var counter = -1; // so that the counter starts at 0
        return {
            /**
             * @method generateUUID
             * @return {String} an (almost) unique UUID
             */
            generateUUID: function () {
                var d = new Date();
                counter = counter+1;

                //var uuid = d.getTime() + "-" + counter;
                //console.log("Service uuid generator : " + uuid);

                return d.getTime() + "-" + counter;
            }


        };
    });
