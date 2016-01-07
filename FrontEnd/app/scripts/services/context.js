'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Context
 * @description
 * # Context
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('Context', function () {

      /**
       * This class represents the web audio context
       */
      class Context {

          /**
           * The default constructor of a web audio context
           */
          constructor (){
              this._context = null;
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
           * This function inits the web audio context.
           */
          init (){
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
      }
  });
