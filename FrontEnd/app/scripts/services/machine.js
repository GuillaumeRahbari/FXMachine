'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Machine
 * @description
 * # Machine
 * Factory in the frontEndApp.
 * TODO : DELETE THIS FILE ?
 */
angular.module('frontEndApp')
  .factory('Machine', function () {

      /**
       * This class represents a machine.
       */
      class Machine {

          /**
           * The constructor of the Machine.
           * @param {String} fileName - The file name of the music we want to listen.
           */
          constructor(fileName){
              this._isInitialized = false;
              this._isPlaying = false;
              this._context = null;
              this._soundBuffer = null;
              this._musicUrl = './sounds/' + fileName; // TODO see if we really need this.
              this._soundInput = null; // The first box of the graph, linked to the soundBuffer
              this._soundOutput = null; // The last box of the graph, linked to.. the speakers in buildGraph()
              this._filters = [];
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
           * Getter of the audio context.
           * @returns {AudioContext} The audio context.
           */
          get context (){
              return this._context;
          }

          /**
           * Setter of the audio context.
           * @param {AudioContext} context - The new audio context.
           */
          set context (context){
              this._context = context;
          }

          /**
           * Getter of the filters.
           * @returns {Array} A filter array.
           */
          get filters (){
              return this._filters;
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

          /**
           * Initialize the "Audio Context", which is kinda the environment where we create the audio graph
           * There can be only one !
           */
          init () {
              try
              {
                  // Fix up for prefixing
                  window.AudioContext = window.AudioContext||window.webkitAudioContext;
                  this.context = new AudioContext();
              }
              catch(e)
              {
                  alert('Web Audio API is not supported in this browser');
              }
          }

          /**
           * Adds a filter to the filters array.
           * @param {Filter} filter - The filter to add.
           */
          addFilter (filter){
              this.filters.push(filter);
          }

          /**
           * Remove a filter from the array of filters
           * @param {Filter} filter - The filter to remove
           */
          removeFilter (filter){
              var index = this.filters.indexOf(filter);

              if (index > -1){
                  this.filters[index].audioNode.disconnect();

                  this.filters.splice(index,1);
              }
          }


      }




      return Machine;
  });
