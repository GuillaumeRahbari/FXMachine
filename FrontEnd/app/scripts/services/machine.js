'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Machine
 * @description
 * # Machine
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('Machine', function () {

      /**
       * This class represents a machine.
       */
      class Machine {

          /**
           * The constructor of the Machine.
           * @param fileName The file name of the music we want to listen.
           */
          constructor(fileName){
              this._isInitialized = false;
              this._isPlaying = false;
              this._context = null;
              this._soundBuffer = null;
              this._musicUrl = './sounds/' + fileName;
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
           * Getter of the boolean isPlaying.
           * @returns {boolean} False if not playing, true if playing.
           */
          get isPlaying (){
              return this._isPlaying;
          }

          /**
           * Setter of the audio context.
           * @param (AudioContext) the new audio context.
           */
          set context (context){
              this._context = context;
          }

          /**
           * Getter of the audio context.
           * @returns {AudioContext} the audio context.
           */
          get context (){
              return this._context;
          }

          /**
           * Getter of the filters.
           * @returns {Array} a filter array.
           */
          get filters (){
              return this._filters;
          }

          /**
           * Initialize the "Audio Context", which is kinda the environment where we create the audio graph
           * There can be only one !
           */
          init () {
              try
              {
                  this.context = new AudioContext();
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
           * @param {Filter} the filter to add.
           */
          addFilter (filter){
              this.filters.push(filter);
          }

          /**
           * Remove a filter from the array of filters
           * @param {Filter} the filter to remove
           */
          removeFilter (filter){
              var index = this.filters.indexOf(filter);

              if (index > -1){
                  // We need to re buildGraph(), so we stop the music
                  if (this.isInitialized && this.isPlaying){
                      this.stopSound();
                  }
                  this.filters.splice(index,1);
              }
          }

      }

      return Machine;
  });
