'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.filter2
 * @description
 * # filter2
 * The new filter !! WORK IN PROGRESS. NOT TESTED
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('Filter2', ['uuidGenerator', function (uuidGenerator) {
    // AngularJS will instantiate a singleton by calling "new" on this function


      class Filter2 {

          // TODO : ESTCE QUON A VRAIMENT BESOIN DUN TABLEAU DINPUTS ?? techniquement non... a voir.

          /**
           * The onstructor of Filter
           * @param type {String} - the type of filter we want to create.
           * @param webaudioService - the webaudioService, that we need to create the audioNodes in the filter objects
           */
        constructor(type, webaudioService){

            var success = true;

            // ALL OUR AVAILABLE FILTERS ARE HERE
            switch(type)
            {
                // Only passing the audio signal
                case 'node':
                    // TODO : j'ai mis panner pour bien les differencier dans les graphes, mais a terme, mettre des gains.
                    this._audioNode = webaudioService.context.createPanner();
                    break;

                case 'gain':
                    this._audioNode = webaudioService.context.createGain();
                    break;
                case 'biquad':
                    this._audioNode = webaudioService.context.createBiquadFilter();
                    break;
                case "waveShaper":
                    this._audioNode = webaudioService.context.createWaveShaper();
                    break;
                case "delay":
                    this._audioNode = webaudioService.context.createDelay(5.0);// represents the MAX DELAY
                    break;

                case "dynamicCompressor":
                    this._audioNode = webaudioService.context.createDynamicsCompressor();
                    break;

                case "stereoPanner":
                    this._audioNode = webaudioService.context.createStereoPanner();
                    break;

                case'visualiser':
                    this._audioNode = webaudioService.context.createAnalyser();
                    // y'a deja des valeurs par defautezk
                    //this._audioNode.smoothingTimeConstant = 0.3;
                    //this._audioNode.fftSize = 1024;
                    break;
                    break;

                default:
                    success = false;
                    console.error("Filter : wrong type given to constructor :");
                    console.error(type);
                    break;
            }

            if(success)
            {
                // Continue construction
                this._type = type;
                // using uuidGenerator service
                this._uuid = uuidGenerator.generateUUID();
                this._inputs = [];
                this._outputs = [];
                console.log("success creation filter")
            }


        }


          /**
           * Adds a filter id to the filters input array.
           * @param {Filter} filter - The filter to add.
           */
          addInput (filterId){
              this.inputs.push(filterId);
          }


          /**
           * Adds a filter id to the filters output array.
           * @param {Filter} filter - The filter to add.
           */
          addOutput (filterId){
              this.outputs.push(filterId);
          }

          /**
           * Removes an input
           * @param filterId
           */
          removeInput(filterId)
          {
              var index = this._inputs.indexOf(filterId);


              if (index > -1){
                  // removing the uuid from connexions
                  this._inputs.splice(index,1);
                  console.info("input removed")
              }
              else
              {
                  console.info("no input to remove");
              }
          }

          /**
           * Removes an output
           * @param filterId
           */
          removeOutput(filterId)
          {
              var index = this._outputs.indexOf(filterId);

              if (index > -1){
                  // removing the uuid from connexions
                  this._outputs.splice(index,1);
                  console.info("output removed")
              }
              else
              {
                  console.info("no output to remove");
              }
          }


          cleanConnexions()
          {
              this._outputs = [];
              this._inputs = [];
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
           * Getter of the filter's uuid.
           * @returns {String} The type of the filter.
           */
          get uuid () {
              return this._uuid;
          }

          /**
           * Getter of the filter's inputs.
           * @returns {Array of uuids} .
           */
          get inputs () {
              return this._inputs;
          }

          /**
           * Getter of the filter's outputs
           * @returns {Array of uuids}
           */
          get outputs () {
              return this._outputs;
          }
      }

      return Filter2;

  }]);
