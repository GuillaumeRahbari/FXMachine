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
 * TODO : passer input et output en filtres de gain, et les afficher proprement dans la vue jsplumb
 * TODO : faire l'interface "superieure" de la pedale, où on a deux boutons et un theme personnalise
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
       .service('Pedal', ['Filter', function (Filter) {

           /**
            * This class represents a pedal.
            */
           class Pedal {

               /**
                * The default constructor of a Pedal.
                * Contains an empty array of filters.
                * @param webaudioService - we keep a copy of it in the pedal because hey. we need it to create filters
                */
               constructor (webaudioService, name) {

                       console.info("default constructor pedal");
                       this._name = name;
                       this._filters = [];
                       // Input and output nodes of the pedal
                       this._input    = new Filter("input", webaudioService);
                       this._output   = new Filter("output", webaudioService);
                       // TODO : this._input.addOutput(this._output.uuid); ou pas osef (conenxion input->output)
                   // TODO : on peut le faire quand le graphe sera ok niveau reprise des connexions
                       this._webaudio = webaudioService;

                       this._comments = [];
                       this._rate = 0;
                       this._ratersCounter = 0;
    }

               /**
               Simili-Object-Constructor
                */
               objectConstructor(pedalJSON, webaudio) {


                   console.info("import pedal : inputoutput");

                   // Input and output nodes of the pedal
                   this._input    = new Filter("input", webaudio);
                   this._output   = new Filter("output", webaudio);
                   this._input.objectContructor(pedalJSON._input, webaudio);
                   this._output.objectContructor(pedalJSON._output, webaudio);

                   console.info("import pedal : filters");

                   var l = pedalJSON._filters.length;//TODO: ya pa linput dedans hein? normalement non mais bon

                   for(var i = 0 ; i < l ; i++)
                   {
                       var filter = new Filter(pedalJSON._filters[i]._type, webaudio);
                      filter.objectContructor(pedalJSON._filters[i], webaudio); // TODO : dans ce import, on recupere pas les params
                       this._filters.push(filter);


                       //importFilter("gain")
                   }

                   console.info("import pedal : other stuff");
                   this._webaudio = webaudio;
                   this._name = pedalJSON._name;
                   this._comments = pedalJSON._comments;
                   this._rate = pedalJSON._rate;
                   this._ratersCounter = pedalJSON._ratersCounter;
               }



               /**
                * Adds a filter to the filters array.
                * @param {Filter} filter - The filter to add.
                */
               addFilter (type) {

                   var filter = new Filter(type, this._webaudio);
                   this._filters.push(filter);
                   //console.log("new filter array" + this._filters)
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
                           this._filters[i].removeInput(filterUUID);
                           this._filters[i].removeOutput(filterUUID);
                       }
                       this._input.removeOutput(filterUUID);
                       this._input.removeInput(filterUUID);
                       this._output.removeOutput(filterUUID);
                       this._output.removeInput(filterUUID);
                       // And finally removing it
                       this._filters.splice(index, 1);
                   }


                   else {
                       console.error("no filter to delete. couldnt find the object MAYBE you tried to delete input or output, which is not permitted bitch!");
                   }
               }


               /**
                * Connect all filters in chain.
                * TODO : methode par defaut en attendant de pouvoir faire de vraies connexions
                */
               connectFiltersInChain () {


                   var l = this._filters.length;

                   // We disconnect everything
                   for (var i = 0; i < l; i++) {
                       this._filters[i].cleanConnexions();
                   }


                   // IF we got filters, well.. we connect them !
                   if (l > 0) {
                       console.info("connecting pedal filters");

                       // Input to first filter
                       this._input.addOutput(this._filters[0].uuid);


                       for (var j = 0; j < l - 1; j++) {
                           // Connect filter to the next one
                           this._filters[j].addOutput(this._filters[j + 1].uuid);
                       }

                       // last filter to output
                       this._filters[l - 1].addOutput(this._output.uuid);

                   }

                   //Otherwise, we just connect input and output together
                   else {
                       console.info("No pedal filters. Connecting input and output...");
                       this._input.addOutput(this._output.uuid);
                   }
               }


               /**
                * Clean all previous connexions
                */
               cleanConnexions () {
                   var l = this._filters.length;

                   // We disconnect everything
                   for (var i = 0; i < l; i++) {
                       this._filters[i].cleanConnexions();
                   }

                   // also input and output
                   this._input.cleanConnexions();
                   this._output.cleanConnexions();
               }


               changeWebAudioContext(newCtx) {
                   // Dans tous les filtres,
                   // Change webaudio !
                   var l = this.filters.length();
                   var i;

                   for(i=0; i<l ; i++)
                   {
                    this._filters[i].changeWebAudioContext(newCtx);
                   }

               }


               // *************** Getters Setters

               /**
                * Getter of the filter array.
                * @returns {Array} The filter array.
                */
               get filters () {
                   return this._filters;
               }

               /**

                */
               get input () {
                   return this._input;
               }

               /**

                */
               get output () {
                   return this._output;
               }

               get name () {
                   return this._name;
               }

               get rate () {
                   return this._name;
               }

               get comments () {
                   return this._comments;
               }

           }

           return Pedal;
       }]);
