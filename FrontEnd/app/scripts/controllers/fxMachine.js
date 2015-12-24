/**
 * Created by maxime on 12/16/15.
 */


'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:fxMachineCtrl
 */
angular.module('frontEndApp')
    .controller('fxMachineCtrl',['$scope', 'Machine', 'Filter', 'Sound', function ($scope, Machine, Filter, Sound) {

        var self = this;

        // Note : the method init() is called when the controller is initialized.

        // The audio machine, containing all the stuff that we don't need to access from the html page (yet)
        var machine = new Machine();

        /**
         Initialize the "Audio Context", which is kinda the environment where we create the audio graph
         There can be only one !
         */
        machine.init();

        /**
         *
         * @param type : the type of filter to add
         */
        self.addFilter = function(type)
        {

            console.log("Adding filter ! .");
            var audioNode = null;

            switch(type)
            {
                case "gain":
                    audioNode = MACHINE.context.createGain();
                    break;
                case "biquad":
                    audioNode = MACHINE.context.createBiquadFilter();
                    // TODO : doit disparaite quand on pourra choisir le type directement en HTML
                    break;
                // Bad type ? Let's just put a debug filter
                default:
                    audioNode = MACHINE.context.createGain();
                    type='debug';
                    break;
            }

            machine.addFilter(new Filter(type, audioNode));


            // We need to re buildGraph(), so we stop the music
            if(machine.isInitialized && machine.isPlaying)
            {
                self.stopSound();
            }
        };


        /**
         * Remove a filter from the array of filters
         * @param filterToRemove
         */
        self.removeFilter = function(filterToRemove)
        {
            // First, we iterate through the filters tab to find the right index to delete
            var l = machine.filters.length;
            console.log("coucou");
            for(var i = 0 ; i < l ; i++)
            {
                if(machine.filters[i] === filterToRemove)
                {
                    console.log("removing filter !");
                    // We need to re buildGraph(), so we stop the music
                    if(machine.isInitialized && machine.isPlaying)
                    {
                        this.stopSound();
                    }


                    machine.filters.splice(i, 1);
                    return;
                }
            }
        };


        /**
         Load our Sound using XHR AND DECODE IT
         */
        self.loadSound = function()
        {
            console.log($scope.soundFile);

            Sound.getSound($scope.soundFile.name).then(
                function (audioData) {
                    machine.context.decodeAudioData(audioData, function (soundBufferDecoded) {
                        machine.soundBuffer = soundBufferDecoded;
                        console.log(soundBufferDecoded);

                        console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");
                        machine.isInitialized = true;
                        angular.element('#play').removeAttr('disabled');
                        angular.element('#load').attr('disabled');
                    }, function () {
                        alert("Decoding the audio buffer failed");
                    }
                    );
                }, function(errorStatus){
                    console.log(errorStatus);
                }
            );

            /*// DEBUG
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

            request.send();*/
        };



        /**
         Construct the graph and play the sound
         Finally: tell the source when to start
         */
        self.playSound = function () {

            if(!machine.isPlaying)
            {
                // play the source now.
                // First parameter = delay in seconds before starting to play
                // Second parameter = where do we start (0 = beginning of song)
                console.log("playing sound");

                // connect sound samples to the speakers
                self.buildGraph();

                // BEWARE : the graph should be connected, if sound has been stopped,
                // and if the graph is not built (i.e the previous line of code is not present)
                // Then the next line will do nothing, we need to rebuild the graph
                machine.soundInput.start(0, 0);

                angular.element('#stop').removeAttr('disabled');
                angular.element('#play').attr('disabled');
                machine.isPlaying = true;
            }
            else
            {
                console.error("trying to play sound but already playing")
            }

        };

        /**
         */
        self.stopSound = function () {
            if(machine.isPlaying)
            {
                console.log("Stopping sound, Graph destroyed, cannot be played again without rebuilding the graph !");
                // stop the source now.
                // Parameter : delay before stopping
                // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
                // We do not need to redecode the data, just to rebuild the graph
                machine.soundInput.stop(0);
                angular.element('#play').removeAttr('disabled');
                angular.element('#stop').attr('disabled');
                machine.isPlaying = false;
            }
            else
            {
                console.error("trying to stop sound but not playing")
            }

        };

        /**
         Connect audio boxes together
         */
        self.buildGraph = function() {


            // Just to visualize the entire chain
            var graph = "";

            console.log("Building the audio graph ...");

            // *** Initializing input and output

            // soundInput becomes the "input" box
            machine.soundInput = machine.context.createBufferSource();
            machine.soundOutput = machine.context.destination;
            machine.soundInput.buffer = machine.soundBuffer;
            console.log(machine.soundInput.connect);



            // *** Connection

            var l = machine.filters.length;

            // IF we got filters, well.. we connect them !
            if (l > 0)
            {
                console.log("filters. Connecting everything together...");

                // Connecting all the filters in a big chain
                for(var i = 0 ; i < l-1 ; i++) {

                    graph = graph+"--->["+machine.filters[i].type+"]";
                    machine.filters[i].obj.connect(machine.filters[i + 1].obj);
                }

                // Connecting Input to first filter
                graph = "X--[Input]-->" + graph;
                machine.soundInput.connect(machine.filters[0].obj);
                // Connecting Output to last filter
                machine.filters[l-1].obj.connect(machine.soundOutput);
                graph = graph+"--->[Output]"
            }
            //Otherwise, we just connect input and output together
            else
            {
                console.log("No filters. Connecting input and output...");
                var graph = graph+"--->[Output]";
                machine.soundInput.connect(machine.soundOutput);
            }

            console.log("FINAL GRAPH");
            console.log(graph);
        };

        // **** Audio Machine methods


        // TODO : faire ce systeme de boutons a la sauce angular
        /*var buttonPlay= null;
        var buttonStop= null;
        var buttonLoad= null;*/

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
        //init();

    }]);