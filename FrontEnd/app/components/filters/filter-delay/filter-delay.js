'use strict';
/**
 * Created by guillaume on 03/02/2016.
 */

/**
 * @ngdoc component
 * @name frontEndApp.component:filterDelay
 * @description
 * # filterDelay
 */
angular.module('frontEndApp')
       .component('filterDelay', {
           templateUrl: 'components/filters/filter-delay/filter-delay.html',
           bindings   : {
               filter: '='
           },
           controller : FilterDelayController
       });

function FilterDelayController () {

    var self = this;

    self.delayTime = 1;

    /**
     * This function rounds the delayTime value.
     */
    self.linkDelayTime = function () {
        self.delayTime = Math.round(self.filter.audioNode.delayTime.value * 100) / 100;
    }
}