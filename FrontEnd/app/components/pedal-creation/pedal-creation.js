/**
 * Created by guillaume on 01/02/2016.
 */

'use strict';

/**
 * @ngdoc component
 * @name frontEndApp.component:pedalCreation
 * @description
 * # pedalCreation
 */
angular.module('frontEndApp')
       .component('pedalCreation', {
           templateUrl: '/components/pedal-creation/pedal-creation.html',
           controller: PedalCreationController
       });

function PedalCreationController (PedalSrv, Pedal, WebAudioSrv){

    var self = this;

    self.submit = function () {
        PedalSrv.putPedal(new Pedal(WebAudioSrv.getMainWebAudio(), self.pedalName));
    };

    self.show = false;

    self.toggle = function () {
        self.show = !self.show;
    }

}