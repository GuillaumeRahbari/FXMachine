'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.WebAudio
 * @description
 * # WebAudio
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('WebAudio', function () {

      /**
       * This class represent a web audio object.
       */
      class WebAudio {

          /**
           * The default constructor of a web audio object.
           */
          constructor (){
              this._isInitialized = false;
              this._isPlaying = false;
              this._soundBuffer = null;
              this._soundInput = null; // The first box of the graph, linked to the soundBuffer
              this._soundOutput = null; // The last box of the graph, linked to.. the speakers in buildGraph()
          }

          /**
           * Getter of the boolean _isInitialized.
           * @returns {boolean} False if not intialized, true if initialized.
           */
          get isInitialized (){
              return this._isInitialized;
          }

          /**
           * Setter of the boolean _isInitialized.
           * @param {boolean} isInitialized - False if not intialized, true if initialized.
           */
          set isInitialized (isInitialized){
              this._isInitialized = isInitialized;
          }

          /**
           * Getter of the boolean isPlaying.
           * @returns {boolean} False if not playing, true if playing.
           */
          get isPlaying (){
              return this._isPlaying;
          }

          /**
           * Setter of the boolean _isPlaying
           * @param {boolean} isPlaying - False if not playing, true if playing.
           */
          set isPlaying (isPlaying){
              this._isPlaying = isPlaying;
          }

          /**
           * Getter of the soundBuffer
           * @returns {AudioBuffer} The sound buffer.
           */
          get soundBuffer () {
              return this._soundBuffer;
          }

          /**
           * Setter of the sound buffer.
           * @param {AudioBuffer} soundBuffer - The new sound buffer.
           */
          set soundBuffer (soundBuffer){
              this._soundBuffer = soundBuffer;
          }

          /**
           * Getter of the sound input.
           * @returns {AudioBufferSourceNode} The sound input.
           */
          get soundInput (){
              return this._soundInput;
          }

          /**
           * Setter of the sound input
           * @param {AudioBufferSourceNode} soundInput - The new sound input.
           */
          set soundInput (soundInput) {
              this._soundInput = soundInput;
          }

          /**
           * Getter of the sound output.
           * @returns {AudioDestinationNode} The sound output.
           */
          get soundOutput () {
              return this._soundOutput;
          }

          /**
           * Setter of the sound output
           * @param {AudioDestinationNode} soundOutput - The new sound output.
           */
          set soundOutput (soundOutput) {
              this._soundOutput = soundOutput;
          }
      }

      return WebAudio;
  });
