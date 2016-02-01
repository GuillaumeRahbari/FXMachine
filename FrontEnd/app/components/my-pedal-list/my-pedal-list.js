'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:myPedalList
 * @description
 * # myPedalList
 */
angular.module('frontEndApp')
       .component('myPedalList', {
           templateUrl: '/components/my-pedal-list/my-pedal-list.html',
           bindings   : {
               pedals: '='
           }
       });
