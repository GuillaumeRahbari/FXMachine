'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Pedal
 * @description
 * # Pedal
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('Pedal', function () {

      /**
       * This class represents a pedal.
       */
      class Pedal {

          /**
           * The default constructor of a Pedal.
           * Contains an empty array of filters.
           */
          constructor (){
              this._filters = [];
          }

          /**
           * Getter of the filter array.
           * @returns {Array} The filter array.
           */
          get filters (){
              return this._filters;
          }

          /**
           * Adds a filter to the filters array.
           * @param {Filter} filter - The filter to add.
           */
          addFilter (filter){
              this.filters.push(filter);
          }


      }
  });
