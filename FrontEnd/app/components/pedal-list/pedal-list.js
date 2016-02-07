'use strict';

/**
 * Created by guillaume on 07/02/2016.
 */

function PedalListController () {

    var self = this;

}

/**
 * @ngdoc component
 * @name frontEndApp.component:pedalList
 * @description
 * # pedalList
 */
angular.module('frontEndApp')
       .component('pedalList', {
           templateUrl: '/components/pedal-list/pedal-list.html',
           controller : PedalListController,
           bindings   : {
               pedals: '='
           }
       });