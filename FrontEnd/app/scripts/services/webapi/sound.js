'use strict';

/**
 * This service permits interactions with sound objects.
 *
 * We need to include the service <i>Sound</i>
 *
 * @example
 * Here is how we do that :
 * angular.module('myModule')
 *  .controller('MyCtrl', ['Sound', function (Sound) {
 * }]);
 *
 * @ngdoc service
 * @name frontEndApp.sound
 * @description
 * # sound
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('Sound', function ($http, $q) {
      var folder = 'sounds/';

      return {
          /**
           * This function gets asynchronously a sound.
           * This function returns a promise.
           * @example Here is how to use it :
           * Sound.getSound('test_music.mp3').then(
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
           * @param {String} fileName - The name of the sound we want to load.
           * @returns {Promise.<T>} Returns the $http promise with :
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
           * Sound.loadSound(machine.context, 'test_music.mp3').then(
           *    // Success callback
           *    function (soundBufferDecoded) {
           *      console.log(soundBufferDecoded);
           *    },
           *    // Error callback.
           *    function (errorMsg) {
           *      console.log(errorMsg);
           *    }
           *  );
           *
           * @param {AudioContext} context - The audio context of the machine.
           * @param {string} fileName - The file to load.
           * @return {promise} Returns a promise with :
           * <ul>
           *     <li>either the sound buffer decoded</li>
           *     <li>either an error message</li>
           * </ul>
           */
          loadSound: function (context, fileName) {
              var deferred = $q.defer();

              this.getSound(fileName).then(
                  function (audioData) {
                      context.decodeAudioData(audioData, function (soundBufferDecoded) {
                          deferred.resolve(soundBufferDecoded);
                      }, function () {
                          deferred.reject("Decoding the audio buffer failed");
                      });
                  },
                  function(errorStatus){
                      deferred.reject(errorStatus);
                  }
              );
              return deferred.promise;
          }
      };
  });
