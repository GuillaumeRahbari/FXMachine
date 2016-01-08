'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.WebAudio
 * @description
 * # WebAudio
 * Service in the frontEndApp.
 * TODO : ca serait bien d'avoir un son par defaut
 */
// TODO : empecher de pouvoir lancer plusieurs fois play en meme temps
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

              this._soundBuffer = null;
              this._soundInput = null; // The first box of the graph, linked to the soundBuffer
              this._soundOutput = null; // The last box of the graph, linked to.. the speakers in buildGraph()

              // The one and only WebAudio context
              this._context = null;

              // output analyser
              this._analyser = null;

              // initialise context and stuff
              this.init();

              this._analyser = this._context.createAnalyser();
              // Default parameters
              this._analyser.smoothingTimeConstant = 0.3;
              this._analyser.fftSize = 1024;


              // Some status infos
              this._isInitialized = false;
              this._isPlaying = false;
              this._isGraphReady = false;

              // We need to keep access of the filters we connected, to be able to delete them afterwards
              this._connectedFilters = [];
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
           * TODO : l'utiliser (mais ca a l'air complique pour y acceder depuis une autre fonction du service)
           */
          getFilterByUUID(array, uuid)
          {
              // Looping on all elements
              for(var i = 0 ; i < array.length ; i++)
              {
                  // Looking for the right one
                  if(array[i].uuid == uuid)
                  return array[i];
              }
              console.error("NO RESULT GETFILTERBYUUID:" + array);
              return undefined;

          };


          /**
           * Gather pedal settings and play the sound with the pedal activated
           * TODO : commenter un peu, chercher a simplifier (connexion de pedalInput...)
           * Note : filterInput and filterOutput are inside the filters array
           * @param filters
           * @param pedalInput
           * @param pedalOutput
           */
          loadGraph(filters, filterInput, filterOutput)
          {

              this.stopSound();
              this.cleanGraph();

              // Handling input source
              this._soundInput = this._context.createBufferSource();
              this._soundOutput = this._context.destination;
              this._soundInput.buffer = this._soundBuffer;


              // **** COnnecting webaudio to filterInput
              this._soundInput.connect(filterInput.audioNode);
              // **** COnnecting filterOutput to webaudio output
              filterOutput.audioNode.connect(this._soundOutput);

              // TODO : faudrait une vraie output sur laquelle on peut se brancher, parce que sur la, soundOutput c le speaker donc on peut pas sy connecter
              filterOutput.audioNode.connect(this._analyser);

              // TODO : utiliser les filters SI YEN A
              // if theres filters, graph and all that stuff

              if(filters != undefined)
              {
                  //Need to build graph with filters here
                  var l = filters.length;

                  if(l >0)
                  {
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
                              outputFilter = this.getFilterByUUID(filters, filterUUID);

                              if(outputFilter == undefined)
                              {
                                  console.error("problem. outputFilter still undefined, no mqtch for the uuid given");
                                  return;
                              }

                              // * and connect the filter to that output filter
                              filters[i].audioNode.connect(outputFilter.audioNode);
                          }

                      }

                      this._connectedFilters = filters;
                      this._isGraphReady = true;

                      console.info("everything well connected !");

                  }
                  else
                  {
                      console.info("something happened.");
                  }

              }
              else
              {
                  console.error("BIG ERROR . S HOULD BE AT LEAST TWO FILTERS WITH FILTERINPUT AND FILTEROUTPUT");
              }
          }

          playSound()
          {
            if(this._isGraphReady)
            {
                this._soundInput.start(0, 0);
                this._isPlaying = true;
            }
             else
            {
                console.warn("Impossible to play sound, build graph before !");
            }


          }

          stopSound() {
              if(this._isPlaying)
              {
                  console.info("Stopping sound, Graph destroyed, cannot be played again without rebuilding the graph !");
                  // stop the source now.
                  // Parameter : delay before stopping
                  // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
                  // We do not need to redecode the data, just to rebuild the graph
                  this._soundInput.stop(0);
                  this._isPlaying = false;
                  this.cleanGraph(); // Just in case, because i dont trust this stuff
                  this._isGraphReady = false;

              }
              else
              {
                  console.warn("trying to stop sound but not playing");
              }
          }


          /**
           * Clean the graph. as simple as that.
           */
          cleanGraph() {
              if(this._isGraphReady)
              {
                  console.log("cleaning graph");
                  var l = this._connectedFilters.length;

                  // All filters
                  for(var i = 0 ; i < l ; i++)
                      this._connectedFilters[i].audioNode.disconnect();

                  // Main input and output
                  this._soundInput.disconnect();
                  this._soundOutput.disconnect();


                  this._connectedFilters = [];
                  this._isGraphReady = false;
              }
              else
              {
                  console.warn("asked to clean graph, but isGraphReady value tells its clean already")
              }

          }

          /*
          Just play the input.
           */
          loadDefaultGraph()
          {

              // before anything, killing graph, just in case
              console.log("loading default graph");
              this.cleanGraph();

              // quick graph
              console.log("WebAudio : creating simple graph input->output.")
              this._soundInput = this._context.createBufferSource();
              this._soundOutput = this._context.destination;
              this._soundInput.buffer = this._soundBuffer;
              this._soundInput.connect(this._soundOutput);

              // Connecting webaudio input to analyzer
              this._soundInput.connect(this._analyser);


              this._isGraphReady = true;


          }

          //********************************** getters



          /**
           getter of the audio context
           */
          get isGraphReady (){
              return this._isGraphReady;
          }

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
