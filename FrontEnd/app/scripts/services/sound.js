'use strict';

/**
 * This service permits interactions with sound objects.
 *
 * We need to include the service <i>sound</i>
 *
 * @example
 * Here is how we do that :
 * angular.module('myModule')
 *  .controller('MyCtrl', ['sound', function (sound) {
 * }]);
 *
 * @ngdoc service
 * @name frontEndApp.sound
 * @description
 * # sound
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('sound', function ($http) {
      var folder = 'sounds/';

      return {
          /**
           * This function gets asynchronously a sound.
           * This function returns a promise.
           * @example Here is how to use it :
           * sound.getSound('test_music.mp3').then(
           *    // Success callback
           *    function (data) {
           *      console.log(data);
           *    },
           *    // Error callback.
           *    function (response) {
           *      console.log(response);
           *    }
           *  );
           *
           * @param fileName The name of the sound we want to load.
           * @returns {*|Promise.<T>} Returns the $http promise with :
           * <ul>
           *     <li>either the array buffer of the sound</li>
           *     <li>either an error</li>
           * </ul>
           */
          getSound: function (fileName) {
              return $http({
                  method: 'GET',
                  url: folder + fileName,
                  responseType: 'arraybuffer'
              }).then(
                  // success
                  function (response) {
                      return response.data;
                  },
                  //error
                  function (error) {
                      return error.status;
                  }
              );
          },

          /**
           * Load a sound.
           *
           * @example Here is how to use it :
           * sound.loadSound('test_music.mp3');
           *
           * @param machine A instance of the Machine class.
           */
          loadSound: function (machine) {
              this.getSound(machine.musicUrl).then(
                  function (audioData) {
                      machine.context.decodeAudioData(audioData, function onSuccess(soundBufferDecoded) {
                          machine.soundBuffer = soundBufferDecoded;

                          console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");
                          machine.initialized = true;
                      }, function onFailure() {
                          alert("Decoding the audio buffer failed");
                      });
                  },
                  function(errorStatus){
                      console.log(errorStatus);
                  }
              )
          }
      };
  });
