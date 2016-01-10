'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Pedal
 * @description
 * # Pedal
 * The pedal
 *
 * La pedale. Elle contient une entrée (filtre), une sortie (filtre), et un array de filtres en tous genres
 *
 * contient aussi un pointeur vers le webaudio service pour creer des filtres easily
 * TODO : passer input et output en filtres de gain, et afficher dans la vue
 * TODO : faire le systeme de boutons de la pedale qui sont liés a quelques boutons des filtres
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('Pedal', ['Filter2',function (Filter, $timeout) {

      /**
       * This class represents a pedal.
       */
      class Pedal {

          /**
           * The default constructor of a Pedal.
           * Contains an empty array of filters.
           */
          constructor (webaudioService){

              this._filters = [];

              // Default parameters

              // ******** TODO : quand on aura un vrai uuid, refaire ce constructeur au propre
              // Input and output nodes of the pedal
              this._input = new Filter("node",webaudioService);

              this._webaudio = webaudioService;

              // Connecting pedal output to analyzer
              // pour passer le temps.. pour eviter que input et output aient le meme uuid
              for(var i = 0 ; i < 10000000 ; i++) // prend 30ms sur mon pc.
              {
                  var j = 0;
              }
              // Just to be sure, needs at least 1 milliseconds between the two events
              this._output = new Filter("node", webaudioService);

          }


          /**
           * Adds a filter to the filters array.
           * @param {Filter} filter - The filter to add.
           */
          addFilter (type) {

              var filter = new Filter(type, this._webaudio);
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

                  for (var i = 0; i < this._filters.length; i++)
                  {
                      this._filters[i].removeInput(filterUUID);
                      this._filters[i].removeOutput(filterUUID);
                  }
                  // And finally removing it
                  this._filters.splice(index, 1);
              }


              else {
                  console.error("no filter to delete. couldnt find the object");
              }
              console.log("new filter array" + this._filters)
          }


            // TODO : temporaire. Connecte en CHAINE. Sera remplacé + tard par un binding direct entre la vue et la Pedale avec les connexions multiples
          // NOTE : FUCK LES INPUTS. CA SERT A RIEN EN FAIT
          connectFiltersInChain()
          {


              var l = this._filters.length;

              // We disconnect everything
              for(var i = 0 ; i < l ; i++)
                this._filters[i].cleanConnexions();



              // IF we got filters, well.. we connect them !
              if (l > 0)
              {
                  console.info("connecting pedal filters");

                  // Input to first filter
                  this._input.addOutput(this._filters[0].uuid);


                  for(var i = 0 ; i < l-1 ; i++){
                      // Connect filter to the next one
                      this._filters[i].addOutput(this._filters[i+1].uuid);
                  }

                  // last filter to output
                  this._filters[l-1].addOutput(this._output.uuid);

              }

              //Otherwise, we just connect input and output together
              else
              {
                  console.info("No pedal filters. Connecting input and output...");
                  this._input.addOutput(this._output.uuid);
              }
          }


          // TODO : temporaire aussi je pense
          cleanConnexions()
          {
              var l = this._filters.length;

              // We disconnect everything
              for(var i = 0 ; i < l ; i++) {
                this._filters[i].cleanConnexions();
              }

              // also input and output
              this._input.cleanConnexions();
              this._output.cleanConnexions();
          }


          // *************** Getters Setters

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





      }

      return Pedal;
  }]);
