'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.WebAudioSrv
 * @description
 * # WebAudioSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
       .factory('WebAudioSrv', function (WebAudio) {
           var webaudio = new WebAudio();
           return {
               /**
                * This function aimed to get the main web audio linked to the main player.
                * @returns {WebAudio} The main web audio.
                */
               getMainWebAudio: function () {
                   return webaudio;
               }
           };
       });
