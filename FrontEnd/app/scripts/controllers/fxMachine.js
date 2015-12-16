/**
 * Created by maxime on 12/16/15.
 */


'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:fxMachineCtrl
 */
angular.module('frontEndApp')
    .controller('fxMachineCtrl', function ()
    {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        // Note : the method init() is called when the controller is initialized.


        // The audio machine, containing all the stuff that we don't need to access from the html page (yet)
        var MACHINE =
        {
            initialized:false,
            isPlaying:false,
            context:null,
            soundBuffer:null,
            // Default value
            musicUrl:'./sounds/test_music.mp3',
            // The first box of the graph, linked to the soundBuffer
            soundInput:null,
            // The last box of the graph, linked to.. the speakers in buildGraph()
            soundOutput:null
        };

        // Array of filters applied on sound
        /*Format:
         type: {String} type of filter
         obj: the filter object (WebAudio API)
         */
        this.filters = [];


        /**
         *
         * @param type : the type of filter to add
         */
        this.addFilter = function(type)
        {

            console.log("Adding filter ! .");
            var filter = null;
            var type = type;

            //
            switch(type)
            {
                case "gain":
                    filter = MACHINE.context.createGain();
                    break;
                case "biquad":
                    filter = MACHINE.context.createBiquadFilter();
                    // TODO : doit disparaite quand on pourra choisir le type directement en HTML
                    break;
                // Bad type ? Let's just put a debug filter
                default:
                    filter = MACHINE.context.createGain();
                    type='debug';
                    break;
            }

            // Update the accessible filters !
            this.filters.push({
                type:type,
                obj:filter
            });

            // We need to re buildGraph(), so we stop the music
            if(MACHINE.initialized && MACHINE.isPlaying)
            {
                this.stopSound();
            }
        }


        /**
         Load our Sound using XHR AND DECODE IT
         */
        this.loadSound = function(url)
        {
            // DEBUG
            url = MACHINE.musicUrl;

            console.log("loading " + url + " using Xhr2");
            // Note: this loads asynchronously
            var request = new XMLHttpRequest();

            request.open("GET", url, true);
            // BINARY TRANSFERT !
            request.responseType = "arraybuffer";

            // Our asynchronous callback
            request.onload = function() {
                var audioData = request.response;

                // We got the sound file from the server, let's decode it

                console.log("decoding audio data... WebAudio uses RAW sample in memory, not compressed one");

                // The Audio Context handles creating source buffers from raw binary
                MACHINE.context.decodeAudioData(audioData, function onSuccess(soundBufferDecoded) {
                    MACHINE.soundBuffer = soundBufferDecoded;

                    console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");

                    buttonPlay.disabled = false;
                    buttonLoad.disabled = true;
                    MACHINE.initialized = true;
                }, function onFailure() {
                    alert("Decoding the audio buffer failed");
                });
            };

            request.send();
        };



        /**
         Construct the graph and play the sound
         Finally: tell the source when to start
         */
        this.playSound = function () {

            if(!MACHINE.isPlaying)
            {
                // play the source now.
                // First parameter = delay in seconds before starting to play
                // Second parameter = where do we start (0 = beginning of song)
                console.log("playing sound");

                // connect sound samples to the speakers
                this.buildGraph();

                // BEWARE : the graph should be connected, if sound has been stopped,
                // and if the graph is not built (i.e the previous line of code is not present)
                // Then the next line will do nothing, we need to rebuild the graph
                MACHINE.soundInput.start(0, 0);

                buttonStop.disabled = false;
                buttonPlay.disabled = true;
                MACHINE.isPlaying = true;
            }
            else
            {
                console.error("trying to play sound but already playing")
            }

        };

        /**
         */
        this.stopSound = function () {
            if(MACHINE.isPlaying)
            {
                console.log("Stopping sound, Graph destroyed, cannot be played again without rebuilding the graph !");
                // stop the source now.
                // Parameter : delay before stopping
                // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
                // We do not need to redecode the data, just to rebuild the graph
                MACHINE.soundInput.stop(0);
                buttonPlay.disabled = false;
                buttonStop.disabled = true;
                MACHINE.isPlaying = false;
            }
            else
            {
                console.error("trying to stop sound but not playing")
            }

        }

        /**
         Connect audio boxes together
         */
        this.buildGraph = function() {


            // Just to visualize the entire chain
            var graph = "";

            console.log("Building the audio graph ...");

            // *** Initializing input and output

            // soundInput becomes the "input" box
            MACHINE.soundInput = MACHINE.context.createBufferSource();
            MACHINE.soundOutput = MACHINE.context.destination;
            MACHINE.soundInput.buffer = MACHINE.soundBuffer;



            // *** Connection

            var l = this.filters.length;

            // IF we got filters, well.. we connect them !
            if (l > 0)
            {
                console.log("filters. Connecting everything together...");

                // Connecting all the filters in a big chain
                for(var i = 0 ; i < l-1 ; i++) {

                    graph = graph+"--->["+this.filters[i].type+"]";
                    this.filters[i].obj.connect(this.filters[i + 1].obj);
                }

                // Connecting Input to first filter
                graph = "X--[Input]-->" + graph;
                MACHINE.soundInput.connect(this.filters[0].obj);
                // Connecting Output to last filter
                this.filters[l-1].obj.connect(MACHINE.soundOutput);
                graph = graph+"--->[Output]"
            }
            //Otherwise, we just connect input and output together
            else
            {
                console.log("No filters. Connecting input and output...");
                var graph = graph+"--->[Output]";
                MACHINE.soundInput.connect(MACHINE.soundOutput);
            }

            console.log("FINAL GRAPH");
            console.log(graph);
        };

        // **** Audio Machine methods


        // TODO : faire ce systeme de boutons a la sauce angular
        var buttonPlay= null;
        var buttonStop= null;
        var buttonLoad= null;

        /**
         Initialize the "Audio Context", which is kinda the environment where we create the audio graph
         There can be only one !
         */
        var init = function()
        {
            try
            {
                MACHINE.context = new AudioContext();
                // Fix up for prefixing
                window.AudioContext = window.AudioContext||window.webkitAudioContext;
                MACHINE.context = new AudioContext();
            }
            catch(e)
            {
                alert('Web Audio API is not supported in this browser');
            }

            // Connecting buttons to variables TODO:NOT VERY ANGULARISED
            buttonPlay = document.getElementById("play");
            buttonStop = document.getElementById("stop");
            buttonLoad = document.getElementById("load");
        };



        // *** Launch initialisation
        init();

    })