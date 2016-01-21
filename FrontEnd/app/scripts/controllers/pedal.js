'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:PedalCtrl
 * @description
 * # PedalCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('PedalCtrl',['WebAudio', 'Pedal', function (WebAudio, Pedal) {

      var self = this;

      self.webaudio = new WebAudio();

      self.pedal = new Pedal(self.webaudio);
  }]);
