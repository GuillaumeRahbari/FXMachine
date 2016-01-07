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
              // Two default nodes to put on the creation graph
              this._input = Filter2("node");
              this._output = Filter2("node");

              this._filters = [];

              // One analyser for each pedal
              this._analyser = machine.context.createAnalyser();
              // Default parameters
              this._analyser.smoothingTimeConstant = 0.3;
              this._analyser.fftSize = 1024;
              // Connecting pedal output to analyzer
              this._output.connect(this._analyser);

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
           * @param {Filter2} filter - The filter to add.
           */
          addFilter (filter2) {
              this.filters.push(filter2);
          }


          /**
           * Remove a filter from the array of filters
           * @param {Filter} filter - The filter to remove
           */
          removeFilter (filter2){
              var index = this.filters.indexOf(filter2);

              if (index > -1){

                  //**** removing filter properly ****\\

                  // Deconnecting the filters from all the others
                  var filterUUID = filters[index];
                  for(var i = 0 ; i < filters.length; i++)
                  {
                      removeInput(filterUUID);
                      removeOutput(filterUUID);
                  }
                    // And finally removing it
                  this.filters.splice(index,1);
              }
          }

      }

      return Pedal;
  });
