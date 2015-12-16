/**
 * Created by maxime on 12/16/15.
 */


'use strict';

// TODO : se debarasser des getElementByIds

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

        // audio context
        var context = null;;


        // The sound, decoded
        var soundBuffer = null;

        var buttonPlay= null;
        var buttonStop= null;
        var buttonLoad= null;

        // url to access the music
        var musicUrl = './sounds/test_music.mp3';


        // The first box of the graph, linked to the soundBuffer
        var soundInput = null;

        // a volume box
        var gainNode = null;

        // a Filter Box
        var filter = null;

        /**
         Initialize the "Audio Context", which is kinda the environment where we put all the boxes
         There can be only one !
         */
        var init = function()
        {

            try
            {
                context = new AudioContext();
                // Fix up for prefixing
                window.AudioContext = window.AudioContext||window.webkitAudioContext;
                context = new AudioContext();
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
            console.log("loading " + musicUrl + " using Xhr2");
            // Note: this loads asynchronously
            var request = new XMLHttpRequest();

            request.open("GET", musicUrl, true);
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
            context.decodeAudioData(audioData, function onSuccess(soundBufferDecoded) {
                soundBuffer = soundBufferDecoded;

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
            soundInput.start(0, 0);

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
            soundInput.stop(0);
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
            soundInput = context.createBufferSource();

            // filter box
            filter = context.createBiquadFilter();

            // Create a gain node.
            gainNode = context.createGain();


            //** Giving parameters to the boxes

            // Create and specify parameters for the low-pass filter.
            filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
            filter.frequency.value = 440; // Set cutoff to 440 HZ


            //** Connect all together

            soundInput.buffer = soundBuffer;
            // Create the audio graph.
            //soundInput.connect(filter);
            // Connect the source to the gain node.
            // filter.connect(gainNode);


            // Connect the gain node to the destination (by default: speaker)
            //gainNode.connect(context.destination);

            soundInput.connect(context.destination);
        }

























// *** Controller initialisation
        init();


    })