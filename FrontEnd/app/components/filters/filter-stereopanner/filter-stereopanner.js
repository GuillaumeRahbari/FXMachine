/**
 * Created by guillaume on 03/02/2016.
 */

/**
 * @ngdoc component
 * @name frontEndApp.component:filterStereopanner
 * @description
 * # filterStereopanner
 */
angular.module('frontEndApp')
       .component('filterStereopanner', {
           templateUrl: 'components/filters/filter-stereopanner/filter-stereopanner.html',
           bindings   : {
               filter: '='
           },
           controller : FilterStereopannerController
       });

function FilterStereopannerController () {

    var self = this;

    self.panValue = 0;

    /**
     * This functions rounds the pan value.
     */
    self.linkPanValue = function () {
        self.panValue = Math.round(self.filter.audioNode.pan.value * 100) / 100;
    };

    /**
     * This function increases the pan value
     */
    self.increaseValue = function () {
        if (self.filter.audioNode.pan.value < 1) {
            self.filter.audioNode.pan.value += 0.1;
            self.panValue = (Math.round(self.filter.audioNode.pan.value * 100) / 100);
        }
    };

    /**
     * This function reduces the pan value.
     */
    self.reduceValue = function () {
        if (self.filter.audioNode.pan.value > -1) {
            self.filter.audioNode.pan.value -= 0.1;
            self.panValue = (Math.round(self.filter.audioNode.pan.value * 100) / 100);
        }
    };
}