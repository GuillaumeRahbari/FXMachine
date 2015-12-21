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

          constructor (type, filter){
              this.type = type;
              this.filter = filter;
          }

      }

    return Filter;
  });
