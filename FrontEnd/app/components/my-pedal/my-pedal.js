'use strict';

/**
 * @ngdoc component
 * @name frontEndApp.component:myPedal
 * @description
 * # myPedal
 */
angular.module('frontEndApp')
       .component('myPedal', {
           templateUrl: 'components/my-pedal/my-pedal.html',
           bindings   : {
               pedal: '='
           }
       });
