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
 * TODO : passer input et output en filtres de gain, et les afficher dans la vue jsplumb
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
             * @param webaudioService - we keep a copy of it in the pedal because hey. we need it to create filters
             */
            constructor (webaudioService){

                this._filters = [];
                // Input and output nodes of the pedal
                this._input = new Filter("node",webaudioService);
                this._output = new Filter("node", webaudioService);
                this._webaudio = webaudioService;
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


            /**
             * Connect all filters in chain.
             * TODO : methode par defaut en attendant de pouvoir faire de vraies connexions
             */
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


            /**
             * Clean all previous connexions
             */
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
