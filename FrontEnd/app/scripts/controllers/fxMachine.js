/**
 * Created by maxime on 12/16/15.
 */


'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:fxMachineCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
    .controller('fxMachineCtrl', function ()
    {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        this.testfct = function() { console.log("heyyyy");};

        this.test = "Coucou angular";


        //*************** Partie accessible sur la page html

        this.loadSound = function()
        {
            loadSound();
        };
        this.playSound = function()
        {
            playSound();
        };
        this.stopSound = function()
        {
            stopSound();
        };

        

        // ************** Reprise du code example


        var MACHINE =
        {
            context:null,
            soundBuffer:null,
            musicUrl:'./sounds/test_music.mp3',
            // The first box of the graph, linked to the soundBuffer
            soundInput:null,
            filters:[],
            soundOutput:null
        };


        // TODO : faire ce systeme de boutons a la sauce angular
        var buttonPlay= null;
        var buttonStop= null;
        var buttonLoad= null;


        /**
         Initialize the "Audio Context", which is kinda the environment where we put all the boxes
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

            buttonPlay = document.getElementById("play");
            buttonStop = document.getElementById("stop");
            buttonLoad = document.getElementById("load");
        };



        /**
         Load our Sound using XHR
         */
        var loadSound = function()
        {
            console.log("loading " + MACHINE.musicUrl + " using Xhr2");
            // Note: this loads asynchronously
            var request = new XMLHttpRequest();

            request.open("GET", MACHINE.musicUrl, true);
            // BINARY TRANSFERT !
            request.responseType = "arraybuffer";

            // Our asynchronous callback
            request.onload = function() {
                var audioData = request.response;
                // We got the sound file from the server, let's decode it
                decode(audioData);
            };

            request.send();
        };


        var decode = function(audioData)
        {
            console.log("decoding audio data... WebAudio uses RAW sample in memory, not compressed one");

            // The Audio Context handles creating source buffers from raw binary
            MACHINE.context.decodeAudioData(audioData, function onSuccess(soundBufferDecoded) {
                MACHINE.soundBuffer = soundBufferDecoded;

                console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");

                buttonPlay.disabled = false;
                buttonLoad.disabled = true;
            }, function onFailure() {
                alert("Decoding the audio buffer failed");
            });
        };









        /**
         Construct the graph and play the sound
         Finally: tell the source when to start
         */
        var playSound = function () {
            // play the source now.
            // First parameter = delay in seconds before starting to play
            // Second parameter = where do we start (0 = beginning of song)
            console.log("playing sound");

            // connect sound samples to the speakers
            buildGraph();

            // BEWARE : the graph should be connected, if sound has been stopped,
            // and if the graph is not built (i.e the previous line of code is not present)
            // Then the next line will do nothing, we need to rebuild the graph
            MACHINE.soundInput.start(0, 0);

            buttonStop.disabled = false;
            buttonPlay.disabled = true;
        };

        /**
         */
        var stopSound = function () {
            console.log("Stopping sound, Graph destroyed, cannot be played again without rebuilding the graph !");
            // stop the source now.
            // Parameter : delay before stopping
            // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
            // We do not need to redecode the data, just to rebuild the graph
           MACHINE.soundInput.stop(0);
            buttonPlay.disabled = false;
            buttonStop.disabled = true;
        }

        /**
         Construct/Initialize the boxes
         */
        var buildGraph = function() {
            console.log("Building the audio graph : connecting decoded sound sample to the speakers");


            // *** Initializing my boxes

            // soundInput becomes the "input" box
            MACHINE.soundInput = MACHINE.context.createBufferSource();
            MACHINE.soundOutput = MACHINE.context.destination;
            MACHINE.soundInput.buffer = MACHINE.soundBuffer;


            // filter box
            //filter = MACHINE.context.createBiquadFilter();

            // Create a gain node.
            //gainNode = MACHINE.context.createGain();


            //** Giving parameters to the boxes

            // Create and specify parameters for the low-pass filter.
            //filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
            //filter.frequency.value = 440; // Set cutoff to 440 HZ




            //** Connect all together
            var l = MACHINE.filters.length;

            // IF we got filters, well..
            if (l > 0)
            {
                console.log("filters. Connecting everything together...");
                // Connecting all filters in a big chain
                for(var i = 0 ; i < l-1 ; i++) {
                    MACHINE.filters[i].connect(MACHINE.filters[i + 1]);
                }

                // Connecting Input to first filter
                MACHINE.soundInput.connect(MACHINE.filters[0]);
                // Connecting Output to last filter
                MACHINE.filters[l].connect(MACHINE.SoundOutput);
            }
            //Otherwise, we just connect input and output together
            else
            {
                console.log("No filters. Connecting input and output...");
                MACHINE.soundInput.connect(MACHINE.soundOutput);
            }
        };



















// *** Controller initialisation
        init();


    })