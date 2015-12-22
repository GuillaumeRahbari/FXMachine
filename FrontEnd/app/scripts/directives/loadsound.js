'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:loadSound
 * @description
 * # loadSound
 */
angular.module('frontEndApp')
  .directive('loadSound', function (sound) {
      return {
          restrict: 'A',
          scope : {
              loadSound: '='
          },
          link: function postLink(scope, element, attrs) {

              element.on('click', function () {
                  // loadSound est ici une machine TODO trouver un moyen de faire ca plus propre
                  sound.getSound(loadSound.musicUrl).then(
                      function (audioData) {
                          loadSound.context.decodeAudioData(audioData, function onSuccess(soundBufferDecoded) {
                              loadSound.soundBuffer = soundBufferDecoded;

                              console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");
                              loadSound.initialized = true;
                              angular.element('#play').addAttr('disabled');
                          }, function onFailure() {
                              alert("Decoding the audio buffer failed");
                          });
                      },
                      function(errorStatus){
                          console.log(errorStatus);
                      }
                  )
              });
          }
      };
  });
