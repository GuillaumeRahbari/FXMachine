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
              this.type = type;
              this.filter = filter;
          }

      }

    return Filter;
  });
