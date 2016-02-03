/**
 * Created by guillaume on 03/02/2016.
 */

/**
 * @ngdoc component
 * @name frontEndApp.component:filterGain
 * @description
 * # filterGain
 */
angular.module('frontEndApp')
       .component('filterGain', {
           templateUrl: 'components/filters/filter-gain/filter-gain.html',
           bindings   : {
               filter: '='
           },
           controller : FilterGainController
       });

function FilterGainController () {

    var self = this;

    /**
     * This function increases the gain value.
     */
    self.increaseValue = function () {
        if (self.filter.audioNode.gain.value < 101) {
            self.filter.audioNode.gain.value += 1;
            self.gainValue = (Math.round(self.filter.audioNode.gain.value * 100) / 100);
        }
    };

    /**
     * This function reduces the fain value.
     */
    self.reduceValue = function () {
        if (self.filter.audioNode.gain.value > 0) {
            self.filter.audioNode.gain.value -= 1;
            self.gainValue = (Math.round(self.filter.audioNode.gain.value * 100) / 100);
        }
        if (self.filter.audioNode.gain.value == 0) {
            self.gainValue = "Son coupé";
        }
    };
}