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
           * @param {AudioNode} filter - The filter object (WebAudio API).
           */
          constructor (type, filter){
              this._type = type;
              this._filter = filter;
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
           * @returns {AudioNode} The filter.
           */
          get filter () {
              return this._filter;
          }

          /**
           * A static method pour get the audio node when we know the type.
           * @param {String} type - The filter's type.
           * @param {AudioContext} context - The audio context.
           * @returns {*}
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
                      // TODO : doit disparaite quand on pourra choisir le type directement en HTML
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
