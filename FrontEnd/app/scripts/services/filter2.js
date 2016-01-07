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
  .service('filter2', ['context', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function



      class Filter2 {

        /**
         * The constructor of a filter.
         * @param {String} type - The filter's type we want to create
         */
        constructor (type){

            var success = true;

            // ALL OUR AVAILABLE FILTERS ARE HERE
            switch(type)
            {
                // Only passing the audio signal
                case 'node':
                    this._audioNode = context.createGain();
                    break;

                case 'gain':
                    this._audioNode = context.createGain();
                    break;

                default:
                    success = false;
                    console.error("FIlter2 : wrong type given to constructor :")
                    console.error(type);

                    break;
            }

            if(success)
            {
                // Continue construction
                this._type = type;

                // TODO : generate real uuid
                this._uuid = generateUUID();
                this._inputs = [];
                this._outputs = [];
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

          removeInput(filterId)
          {
              var index = this._inputs.indexOf(filterId);

              if (index > -1){
                  // removing the uuid from connexions
                  this.filters.splice(index,1);
                  console.info("input removed")
              }
              else
              {
                  console.info("no input to remove");
              }
          }

          removeOutput(filterId)
          {
              var index = this._outputs.indexOf(filterId);

              if (index > -1){
                  // removing the uuid from connexions
                  this.filters.splice(index,1);
                  console.info("output removed")
              }
              else
              {
                  console.info("no output to remove");
              }
          }


          // TODO : PROVISOIRE
          generateUUID() {
              var d = new Date().getTime();
              return d;
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
