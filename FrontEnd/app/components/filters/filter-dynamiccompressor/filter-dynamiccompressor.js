'use strict';
/**
 * Created by guillaume on 03/02/2016.
 */

/**
 * @ngdoc component
 * @name frontEndApp.component:filterDynamiccompressor
 * @description
 * # filterDynamiccompressor
 */
angular.module('frontEndApp')
       .component('filterDynamiccompressor', {
           templateUrl: 'components/filters/filter-dynamiccompressor/filter-dynamiccompressor.html',
           bindings   : {
               filter: '='
           },
           controller : FilterDynamiccompressorController
       });

function FilterDynamiccompressorController () {

    var self = this;

    self.dynamicCompressorAttackValue  = 0.5;
    self.dynamicCompressorReleaseValue = 0.25;

    /**
     * This functions rounds the attack value.
     */
    self.linkAttack = function () {
        self.dynamicCompressorAttackValue = Math.round(self.filter.audioNode.attack.value * 100) / 100;
    };

    /**
     * This function rounds the release value.
     */
    self.linkRelease = function () {
        self.dynamicCompressorReleaseValue = Math.round(self.filter.audioNode.release.value * 100) / 100;
    };
}