'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Pedal
 * @description
 * # Pedal
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('Pedal', ['Filter2',function (Filter) {

      /**
       * This class represents a pedal.
       */
      class Pedal {

          /**
           * The default constructor of a Pedal.
           * Contains an empty array of filters.
           */
          constructor (webaudioService){
              // Two default nodes to put on the creation graph
              this._input = new Filter("node",webaudioService);
              this._output = new Filter("node", webaudioService);

              this._filters = [];

              // One analyser for each pedal
              this._analyser = webaudioService.context.createAnalyser();
              // Default parameters
              this._analyser.smoothingTimeConstant = 0.3;
              this._analyser.fftSize = 1024;
              // Connecting pedal output to analyzer TODO
              this._output.audioNode.connect(this._analyser);

              this._webaudio = webaudioService;
          }

          /**
           * Getter of the filter array.
           * @returns {Array} The filter array.
           */
          get filters (){
              return this._filters;
          }

          /**

           */
          get input (){
              return this._input;
          }

          /**

           */
          get output (){
              return this._output;
          }

          /**

           */
          get analyser (){
              return this._analyser;
          }

          /**
           * Adds a filter to the filters array.
           * @param {Filter2} filter - The filter to add.
           */
          addFilter (type) {

              var filter = new Filter(type, this._webaudio)
              this._filters.push(filter);

              console.log("new filter array" + this._filters)
          }


          /**
           * Remove a filter from the array of filters
           * @param {Filter} filter - The filter to remove
           */
          removeFilter (filter) {

              var index = this._filters.indexOf(filter);

              if (index > -1) {
                  console.log("deleting filter");

                  //**** removing filter properly ****\\

                  // Deconnecting the filters from all the others
                  var filterUUID = this._filters[index].uuid;
                  for (var i = 0; i < this._filters.length; i++) {
                      filter.removeInput(filterUUID);
                      filter.removeOutput(filterUUID);
                  }
                  // And finally removing it
                  this._filters.splice(index, 1);
              }


              else {
                  console.error("no filter to delete. couldnt find the object");
              }
              console.log("new filter array" + this._filters)
          }


            // TODO : temporaire. COnnecte en CHAINE.
          // NOTE : FUCK LES INPUTS. CA SERT A RIEN EN FAIT
          connectFilters()
          {


              var l = this._filters.length;

              // We disconnect everything
              for(var i = 0 ; i < l ; i++) {
                  for(var j = 0 ; j < l ; j++)
                  {
                      if(i != j)
                      {
                          this._filters[i].removeInput(this._filters[j].uuid);
                          this._filters[i].removeOutput(this._filters[j].uuid);
                      }

                  }
              }


              // IF we got filters, well.. we connect them !
              if (l > 0)
              {
                  console.info("connecting pedal filters");
                  this._input.addOutput(this._filters[0].uuid);
                  this._filters[0].addInput(this._input.uuid);

                  for(var i = 0 ; i < l-1 ; i++){
                      // Connect filter to the next one
                      this._filters[i].addOutput(this._filters[i+1].uuid);
                  }

                  // Final connexion to pedal output
                  this._filters[l-1].addOutput(this._output.uuid);

              }

              //Otherwise, we just connect input and output together
              else
              {
                  console.info("No pedal filters. Connecting input and output...");
                  this._input.addOutput(this._output.uuid);
              }
          }


      }

      return Pedal;
  }]);
