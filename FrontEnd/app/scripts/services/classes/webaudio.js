'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.WebAudio
 * @description
 * # WebAudio
 * Service in the frontEndApp.
 * TODO : ca serait bien d'avoir un son par defaut
 * TODO : un bouton pause
 * TODO : empecher de pouvoir lancer plusieurs fois play en meme temps
 */
angular.module('frontEndApp')
  .service('WebAudio', ['Sound',function (Sound) {

      /**
       * This class represent a web audio object.
       */
      class WebAudio {


          /**
           * The default constructor of a web audio object.
           */
          constructor (){
              console.log("webaudio contructor!");

              this._soundBuffer = null; // the buffer of audio files
              this._micBuffer = null; // the "buffer" of microphone live input
              this._soundInput = null; // The first box of the graph, linked to the soundBuffer
              this._soundOutput = null; // The last box of the graph, linked to.. the speakers in buildGraph()

              this._startPlayTime = 0;
              this._playerTime = 0; // This one is not always correct. It's updated manually

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

              this._inputMode = 'fileMode';

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
           *
           * @param input {String} the input mode
           */
          changeInputMode(input)
          {

              console.log("changing input from " + this._inputMode + " to " + input);
              // Killing anything going on at this point
             // this.cleanGraph();

              // We just try to kill everything.
              this.killMic();
              this.killSound();

              switch(input)
              {
                  case 'fileMode':
                      this._inputMode = input;
                      break;
                  case 'micMode':
                      this._inputMode = input;
                      break;

                  default:
                  console.error("Wrong input type :");
                  console.error(input);
              }
              //this._inputMode = input;
          }


          /**
           *
           */
          getFilterByUUID(array, uuid)
          {
              // Looping on all elements
              for(var i = 0 ; i < array.length ; i++)
              {
                  // Looking for the right one
                  if(array[i].uuid === uuid) {
                      return array[i];
                  }
              }
              console.error("NO RESULT GETFILTERBYUUID:" + array);
              return undefined;
          }


          /**
           * Pre loading different, depending on input source
           */
          preLoadGraph()
          {
              console.log('preload graph');
              if(this._isInitialized)
              {
                  this.killSound();
                  this.pauseMic();
                  //this.killMic();

                  this.cleanGraph();


                  // quick graph
                  //console.log("WebAudio : creating simple graph input->output.");

                  if(this._inputMode =='fileMode')
                  {
                      this._soundInput = this._context.createBufferSource();
                      this._soundInput.buffer = this._soundBuffer;
                      console.log('file load graph');
                  }
                  else if(this._inputMode =='micMode')
                  {
                      console.log('mic load graph');
                      this._soundInput = this._context.createMediaStreamSource( this._micBuffer );
                      this._soundInput.disconnect();
                  }
                  else
                  {
                      console.warn("bad input mode during default graph loading");
                  }

                  this._soundOutput = this._context.destination;
                  // Connecting webaudio input to analyzer
                  this._soundInput.connect(this._analyser);
              }
              else {
                  console.error('preloading failed !');
              }

          }


          /**
           * Load new audio graph
           * Note : filterInput and filterOutput are inside the filters array
           * @param {Array} filters - all the filters to connecy
           * @param filterInput - the filter on which we connect the soundInput
           * @param filterOutput - the filter on which we connect the soundOutput
           */
          loadGraph(filters, filterInput, filterOutput)
          {
              if(this._isInitialized)
              {

                  this.preLoadGraph();
                  this._soundInput.connect(filterInput.audioNode);
                  filterOutput.audioNode.connect(this._soundOutput);

                  // if theres filters, graph and all that stuff

                  if(filters !== undefined)
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
                                  var outputFilter;
                                  outputFilter = this.getFilterByUUID(filters, filterUUID);

                                  if(outputFilter === undefined)
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
              else {
                  console.warn("tryig to load graph but not initialized yet");
                  alert("the web audio context is not initialized, we make this operation");
              }

              //TODO:sale
              if(this._inputMode =='micMode')
              {
                  this._isPlaying = true;
              }

          }


          /**
           Just create a graph connecting input to output(speakers)
           */
          loadDefaultGraph()
          {

              console.log("load default graph");
              if(this._isInitialized)
              {
                  // before anything, killing graph, just in case
                  console.log("loading default graph OK nitialized");

                  this.preLoadGraph();
                  this._soundInput.connect(this._soundOutput);

                  this._isGraphReady = true;
              }
              else
              {
                  console.warn("webaudio not initialised ! not loading graph before it is.");
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
                  for(var i = 0 ; i < l ; i++) {
                      this._connectedFilters[i].audioNode.disconnect();
                  }

                  // Main input and output
                  this._soundInput.disconnect();
                  this._soundOutput.disconnect();


                  this._connectedFilters = [];
                  this._isGraphReady = false;
              }
              else
              {
                  console.warn("asked to clean graph, but isGraphReady value tells its clean already");
              }

          }



          //******************************* MICMODE SPECIFIC METHODS

          /**
           * Loads the mic by requesting access to the browser
           */
          loadMic()
          {
              console.log("load mic mode !");
              if(this._inputMode == 'micMode')
              {
                  var self = this;
                  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                  // navigator.getUserMedia( {audio:true}, this.gotStream(stream), function(err){console.log("err:"+err)} );

                  navigator.webkitGetUserMedia({audio:true}, function(stream){

                      console.log('mic loaded');

                      self._micBuffer = stream;
                      self._isInitialized = true;

                  }, function(){altert('lol fail')});
              }
              else {

                  console.log('asked to load Mic but input mode not good:');
                  console.log(this._inputMode);
              }
          }


          /**
           * Creates a default graph, and sound starts playing
           */
          startMic()
          {



              // It's a bit different than fileMode, we load default graph here directly because mic sound starts automatically
              if(this._inputMode =='micMode')
              {
                  this.loadDefaultGraph();

                  if(this._isGraphReady)
                  {
                      this._isPlaying = true;
                  }
                  else
                  {
                      console.warn("Impossible to play sound, build graph before !");
                  }
              }
              else
              {
                  console.warn('asked for start Mic but wrong input mode:');
                  console.warn(this._inputMode);
              }
          }

          /**
           * Pause mic for the user, but actually destroy the graph
           * TODO : just disconnect input node ?
           */
          pauseMic()
          {
              if(this._inputMode =='micMode')
              {
                  if(this._isPlaying)
                  {
                      console.info("Pausing mic, Graph destroyed, cannot be played again without rebuilding the graph !");
                      // stop the source now.
                      // Parameter : delay before stopping
                      // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
                      // We do not need to re-decode the data, just to rebuild the graph
                      this._isPlaying = false;
                      this.cleanGraph(); // Just in case, because i dont trust this stuff
                      this._isGraphReady = false;

                      this._soundOutput.disconnect();
                  }
                  else
                  {
                      console.warn("trying to stop mic but not started");
                  }
              }
              else
              {
                  console.warn('asked stuff but wrong input mode:');
                  console.warn(this._inputMode);
              }
          }

          /**
          Stop is just pause + kill
           */
          stopMic()
          {
              if(this._inputMode =='micMode')
              {
                  if(this._isPlaying)
                  {
                      this.pauseMic();
                  }
                  else
                  {
                     // console.warn("trying to stop mic but not started");
                  }

                  this.killMic();
              }
              else
              {
                  console.warn('asked stuff but wrong input mode:');
                  console.warn(this._inputMode);
              }
          }

          /**
           * Destroys everything about the mic
           */
          killMic()
          {
              if(this._inputMode == 'micMode')
              {
                  if(this._isPlaying)
                  {
                      this.stopMic();
                  }
                  if(this._micBuffer != null)
                  {
                      this._micBuffer.getAudioTracks()[0].stop();
                      this._micBuffer = null;
                      this._isInitialized = false;
                  }
                  else {
                      console.info("killmic : already killed");
                  }
              }
              else {
                  console.info('killmic tried not in mic mode');
              }


          }

          // *********************** FILEMODE SPECIFIC METHODS



          playSound()
          {
              if(this._inputMode =='fileMode')
              {
                  if(this._isGraphReady && !this._isPlaying)
                  {
                      //this._soundInput.start(0, this._context.currentTime + 20);
                      if(this._playerTime > 0)

                      {
                          this._soundInput.start(0, this._playerTime/1000);
                      }
                      else
                      {
                          this._soundInput.start(0, this._playerTime/1000);
                      }

                      this._isPlaying = true;
                      //this._startPlayTime = Date.now();
                      this._startPlayTime = Date.now() - this._playerTime;

                  }
                  else
                  {
                      console.warn("Impossible to play sound, build graph before ! or it's already playing");
                  }
              }
              else
              {
                  console.warn('asked for play sound but wrong input mode:');
                  console.warn(this._inputMode);
              }

          }



          pauseSound()
          {
              if(this._isPlaying) {
                  var starttime = this._playerTime = Date.now()-this._startPlayTime; // This one is not always correct. It's updated manually
                  this.stopSound();
                  this._playerTime = starttime; // We keep track of time
                  this._isPlaying = false;
              }
              else {
                  console.warn('tried to pause but not playing')
              }

          }

          stopSound() {
              if(this._inputMode =='fileMode')
              {

                      console.info("Stopping sound, Graph destroyed, cannot be played again without rebuilding the graph !");
                      // stop the source now.
                      // Parameter : delay before stopping
                      // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
                      // We do not need to redecode the data, just to rebuild the graph
                  if(this._isPlaying)
                  {
                      this._soundInput.stop(0);
                      this._isPlaying = false;
                  }

                      this.cleanGraph(); // Just in case, because i dont trust this stuff
                      this._isGraphReady = false;
                      this._startPlayTime = 0;
                      this._playerTime = 0; // This one is not always correct. It's updated manually

              }
              else
              {
                  console.warn('asked for play sound but wrong input mode:');
                  console.warn(this._inputMode);
              }


          }


          killSound() {
              if(this._inputMode == 'fileMode')
              {
                  //this.stopSound();
                  if(this._isPlaying)
                  {
                      this.stopSound();
                  }
                  if(this._soundBuffer != null)
                  {

                      this._soundBuffer = null;
                      this._soundInput = null;
                      this._isInitialized = false;
                  }
                  else {
                      console.info("killSound : already killed");
                  }
              }
              else {
                  console.info("kill sound tried not in file mode");
              }

          }


          //********************************** getters



          /**
           getter of the audio context
           */
          get isGraphReady (){
              return this._isGraphReady;
          }

          /**
           * Getter of the audio context.
           * @returns {AudioContext} The audio context.
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

          get inputMode (){
              return this._inputMode;
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



        get startPlayTime () {
            return this._startPlayTime;
        }
           get playerTime () {
               return this._playerTime;
           }

          // A simple way to access time in the html
          get now () {
              return Date.now();
          }

          /**
           * This function loads a sound.
           * @param {String} fileName - The file to load.
           */
          loadsound (fileName) {
              console.log("load sond")
              var self = this;
              Sound.loadSound(self.context, fileName).then(
                  function (soundBufferDecoded) {
                      self.soundBuffer = soundBufferDecoded;

                      console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");
                      self.isInitialized = true;

                  }, function(errorMsg){
                      console.log(errorMsg);
                  }
              );

          }
      }

      return WebAudio;

  }]);
