'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.WebAudio
 * @description
 * # WebAudio
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('WebAudio', ['Sound', function () {

      /**
       * This class represent a web audio object.
       */
      class WebAudio {




          /**
           * The default constructor of a web audio object.
           */
          constructor (){
              console.log("webaudio contructor!")
              this._isInitialized = false;
              this._isPlaying = false;
              this._soundBuffer = null;
              this._soundInput = null; // The first box of the graph, linked to the soundBuffer
              this._soundOutput = null; // The last box of the graph, linked to.. the speakers in buildGraph()


              this._context = null;

              this._analyser = null;

              this.init();

              this._analyser = this._context.createAnalyser();
              // Default parameters
              this._analyser.smoothingTimeConstant = 0.3;
              this._analyser.fftSize = 1024;

          }


          /**
           * Initialize the "Audio Context", which is kinda the environment where we create the audio graph
           * There can be only one !
           */
          init () {
              try
              {
                  // Fix up for prefixing
                  window.AudioContext = window.AudioContext||window.webkitAudioContext;
                  this._context = new AudioContext();
              }
              catch(e)
              {
                  alert('Web Audio API is not supported in this browser');
              }
          }


          /**
           * Load a sound
           * TODO : faudrait peutetre splitter ca (jarrive pas a acceder au scope visiblement..
           */


          getFilterByUUID(array, uuid)
          {
              for(var i = 0 ; i < array.length ; i++)
              {
                  if(array[i].uuid == uuid)
                  return array[i];
              }
              console.error("NO RESULT GETFILTERBYUUID:" + filters)
              return undefined;

          };


          /**
           * TODO : commenter un peu, chercher a simplifier (connexion de pedalInput...)
           * @param filters
           * @param pedalInput
           * @param pedalOutput
           */
          playSoundFromPedal(filters, pedalInput, pedalOutput)
          {

              this._soundInput = this._context.createBufferSource();
              this._soundOutput = this._context.destination;
              this._soundInput.buffer = this._soundBuffer;

              // TODO : utiliser les filters SI YEN A
              // if theres filters, graph and all that stuff

              if(filters != undefined)
              {
                  //Need to build graph with filters here
                  var l = filters.length;

                  if(l >0)
                  {
                      // **** COnnectinf webaudio to pedalInput
                      this._soundInput.connect(pedalInput.audioNode);


                      // **** Connecting pedalInput to its filters
                      // TODO : grosse duplication de code
                      /*for(var i = 0 ; i < pedalInput.outputs.length ; i++)
                      {
                          // * get uuids of output
                          var filterUUID = pedalInput.outputs[i];
                          console.log("filterUUID:"+filterUUID);

                          // * FInd the matching filter
                          var outputFilter = undefined;
                          // COuld be pedalOutput
                          if(filterUUID == pedalOutput.uuid)
                          {
                              console.info("conenxion: output filter was pedaloutput")
                              outputFilter = pedalOutput;
                          }


                          for(var k = 0 ; k < filters.length ; k++)
                          {
                              if(filters[k].uuid == filterUUID)
                              {
                                  outputFilter = filters[k];
                                  console.info("output filter found in pedal filters")
                              }

                          }
                          if(outputFilter == undefined)
                          {
                              console.error("problem. outputFilter still undefined, no mqtch for the uuid given");
                              return;
                          }

                          // * and connect the filter to that output filter
                          pedalInput.audioNode.connect(outputFilter.audioNode);
                      }*/


                      // **** COnnecting pedalOutput to webaudio output
                      pedalOutput.audioNode.connect(this._soundOutput);

                      // **** COnnecting everything inside


                      for(var i = 0 ; i < l ; i++) // For each filter
                      {
                          // and for each output of the filter
                          for(var j = 0 ; j < filters[i].outputs.length; j++)
                          {
                              // * get uuids of ouput
                              var filterUUID = filters[i].outputs[j];
                                  console.log("filterUUID:"+filterUUID);

                              // * FInd the matching filter
                              var outputFilter = undefined;
                              // COuld be pedalOutput
                              if(filterUUID == pedalOutput.uuid)
                              {
                                  console.info("conenxion: output filter was pedaloutput")
                                  outputFilter = pedalOutput;
                              }


                              for(var k = 0 ; k < filters.length ; k++)
                              {
                                  if(filters[k].uuid == filterUUID)
                                  {
                                      outputFilter = filters[k];
                                      console.info("output filter found in pedal filters")
                                  }

                              }
                              if(outputFilter == undefined)
                              {
                                  console.error("problem. outputFilter still undefined, no mqtch for the uuid given");
                                  return;
                              }

                              // * and connect the filter to that output filter
                              filters[i].audioNode.connect(outputFilter.audioNode);
                          }

                      }

                        console.log("starting music...");
                      this._soundInput.start(0, 0);
                      this._isPlaying = true;

                  }
                  else
                  {
                      console.info("something happened.");
                  }

              }
              else
              {
                  console.error("smth happened");
              }
          }

          playSound()
          {


              // otherwise, just play input sound
              {
                  // quick graph
                  console.log("playsound called without filters : playing source.")
                  this._soundInput = this._context.createBufferSource();
                  this._soundOutput = this._context.destination;
                  this._soundInput.buffer = this._soundBuffer;
                  this._soundInput.connect(this._soundOutput);

                  // Connecting webaudio input to analyzer
                  this._soundInput.connect(this._analyser);

              }

              this._soundInput.start(0, 0);
              this._isPlaying = true;

          }

          stopSound() {
              if(this._isPlaying)
              {
                  console.log("Stopping sound, Graph destroyed, cannot be played again without rebuilding the graph !");
                  // stop the source now.
                  // Parameter : delay before stopping
                  // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
                  // We do not need to redecode the data, just to rebuild the graph
                  this._soundInput.stop(0);
                  this._isPlaying = false;

              }
              else
              {
                  console.error("trying to stop sound but not playing");
              }
          }



          //********************************** getters



          /**
           getter of the audio context
           */
          get context (){
              return this._context;
          }

          /**

           */
          get analyser (){
              return this._analyser;
          }

          /**
           * Getter of the boolean _isInitialized.
           * @returns {boolean} False if not intialized, true if initialized.
           */
          get isInitialized (){
              return this._isInitialized;
          }

          /**
           * Setter of the boolean _isInitialized.
           * @param {boolean} isInitialized - False if not intialized, true if initialized.
           */
          set isInitialized (isInitialized){
              this._isInitialized = isInitialized;
          }

          /**
           * Getter of the boolean isPlaying.
           * @returns {boolean} False if not playing, true if playing.
           */
          get isPlaying (){
              return this._isPlaying;
          }

          /**
           * Setter of the boolean _isPlaying
           * @param {boolean} isPlaying - False if not playing, true if playing.
           */
          set isPlaying (isPlaying){
              this._isPlaying = isPlaying;
          }

          /**
           * Getter of the soundBuffer
           * @returns {AudioBuffer} The sound buffer.
           */
          get soundBuffer () {
              return this._soundBuffer;
          }

          /**
           * Setter of the sound buffer.
           * @param {AudioBuffer} soundBuffer - The new sound buffer.
           */
          set soundBuffer (soundBuffer){
              this._soundBuffer = soundBuffer;
          }

          /**
           * Getter of the sound input.
           * @returns {AudioBufferSourceNode} The sound input.
           */
          get soundInput (){
              return this._soundInput;
          }

          /**
           * Setter of the sound input
           * @param {AudioBufferSourceNode} soundInput - The new sound input.
           */
          set soundInput (soundInput) {
              this._soundInput = soundInput;
          }

          /**
           * Getter of the sound output.
           * @returns {AudioDestinationNode} The sound output.
           */
          get soundOutput () {
              return this._soundOutput;
          }

          /**
           * Setter of the sound output
           * @param {AudioDestinationNode} soundOutput - The new sound output.
           */
          set soundOutput (soundOutput) {
              this._soundOutput = soundOutput;
          }
      }

      return WebAudio;
  }]);
