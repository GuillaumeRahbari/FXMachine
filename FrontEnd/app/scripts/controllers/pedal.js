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

      // TODO : je sais pas ce que c'est que ce délire mais le webaudio dans la pedale doit etre le web audio de main-web-audio
      self.webaudio = new WebAudio();

      self.pedal = new Pedal(self.webaudio);
  }]);
