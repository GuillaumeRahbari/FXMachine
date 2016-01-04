'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Filter
 * @description
 * # Filter
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('Filter', function () {

      class Filter {

          /**
           * The constructor of a filter.
           * @param {String} type - The filter's type.
           * @param {AudioNode} audioNode - The audioNode object (WebAudio API).
           */
          constructor (type, audioNode, machine){
              this._type = type;
              this._audioNode = audioNode;
              this._analyzer = machine._context.createAnalyser();
          }

          /**
           * Getter of the type.
           * @returns {String} The type of the filter.
           */
          get type () {
              return this._type;
          }

          /**
           * Getter of the filter.
           * @returns {AudioNode} The audioNode object.
           */
          get audioNode () {
              return this._audioNode;
          }

          /**
           * Getter of the analyzer.
           * @returns {AnalyzerNode} - The Analyzer node linked to the filter.
           */
          get analyzer () {
              return this._analyser;
          }

          /**
           * A static method pour get the audio node when we know the type.
           * @param {String} type - The filter's type.
           * @param {AudioContext} context - The audio context.
           * @returns {AudioNode} The audio node object corresponding to the type.
           */
          static getAudioNodeByType (type, context){
              var audioNode = null;

              switch(type)
              {
                  case "gain":
                      audioNode = context.createGain();
                      break;
                  case "biquad":
                      audioNode = context.createBiquadFilter();
                      break;
                  // Bad type ? Let's just put a debug filter
                  default:
                      audioNode = context.createGain();
                      type='debug';
                      break;
              }
              return audioNode;

          }

      }

    return Filter;
  });
