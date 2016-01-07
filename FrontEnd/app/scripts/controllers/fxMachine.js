/**
 * Created by maxime on 12/16/15.
 */


'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:fxMachineCtrl
 */
angular.module('frontEndApp')
    .controller('fxMachineCtrl',['$scope', 'Machine', 'Filter', 'Sound', 'WebAudio', function ($scope, Machine, Filter, Sound, WebAudio) {





        var self = this;


        // TODO : bug -> si la musique a reprise a zero, l'ajout d'un filtre va quand meme la faire repartir a la position d'ecoute d'avant
        // Note : the method init() is called when the controller is initialized.

        // The audio machine, containing all the stuff that we don't need to access from the html page (yet)


        var webaudio = new WebAudio();
       // webaudio.init();
        this.webaudio = webaudio;
        //this.webaudio = webaudio;
/*
        var context = new context();
        context.init();
        */




        /**
         * Load a sound
         */
        self.loadSound2 = function() {

            console.log("loadsong2!")
            Sound.loadSound(webaudio.context, $scope.soundFile.name).then(
                function (soundBufferDecoded) {
                    webaudio.soundBuffer = soundBufferDecoded;

                    console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");
                    webaudio.isInitialized = true;
                    //angular.element('#play').removeAttr('disabled');

                    // put in comment so we can load a new song if we want
                    //angular.element('#load').attr('disabled', 'disabled');

                }, function(errorMsg){
                    console.log(errorMsg);
                }
            );
        };

        /**
         Play the input sound (NO FILTERS HERE)
         */
        self.playSound2 = function () {

            webaudio.playSound();

        };

        /**
         * It's STOP, not PAUSE.
         */
        self.stopSound2 = function () {
            webaudio.stopSound();

        };


        // ******************* OLD STUFF!!! *************************************************


        /**
         * Add a filter to the filter array.
         * @param {string} type - The type of the filter to add.
         */
        self.addFilter = function(type)
        {
            console.log("Adding filter ! .");

            machine.addFilter(new Filter(type, Filter.getAudioNodeByType(type,machine.context), machine));

            // We need to re buildGraph(), so we stop the music
            // And relaunch it immediately
            // TODO : bug au debut de la musique, fait un saut
            if(machine.isInitialized && machine.isPlaying)
            {
                var currentTime = machine.context.currentTime;
                self.stopSound();
                self.playSound(currentTime);
            }

        };


        /**
         * Remove a filter from the array of filters
         * @param {Filter} filterToRemove - The filter to remove.
         */
        self.removeFilter = function(filterToRemove)
        {

            machine.removeFilter(filterToRemove);
            // We need to re buildGraph(), so we stop the music
            // And relaunch it immediately
            // TODO : bug au debut de la musique, fait un saut
            if (machine.isInitialized && machine.isPlaying){

                var currentTime = machine.context.currentTime;
                self.stopSound();
                self.playSound(currentTime);
            }
        };


        /**
         * Load a sound
         */
        self.loadSound = function() {
            Sound.loadSound(machine.context, $scope.soundFile.name).then(
                function (soundBufferDecoded) {
                    machine.soundBuffer = soundBufferDecoded;

                    console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");
                    machine.isInitialized = true;
                    angular.element('#play').removeAttr('disabled');

                    // put in comment so we can load a new song if we want
                    //angular.element('#load').attr('disabled', 'disabled');



                }, function(errorMsg){
                    console.log(errorMsg);
                }
            );
        };



        /**
         Construct the graph and play the sound
         Finally: tell the source when to start
         */
        self.playSound = function (startTime) {

            startTime = typeof startTime !== 'undefined' ?  startTime : 0;
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
                machine.soundInput.start(0, startTime);

                angular.element('#stop').removeAttr('disabled');
                angular.element('#play').attr('disabled', 'disabled');
                machine.isPlaying = true;
            }
            else
            {
                console.error("trying to play sound but already playing");
            }

        };

        /**
         * It's STOP, not PAUSE.
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
                angular.element('#stop').attr('disabled', 'disabled');
                machine.isPlaying = false;


            }
            else
            {
                console.error("trying to stop sound but not playing");
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
            // TODO : we dont have to create at every graph build // ou alors faut supprimer les vieux je sais pas -> Ben en fait c'est la bonne methode...
            //
            machine.soundInput = machine.context.createBufferSource();
            machine.soundOutput = machine.context.destination;
            machine.soundInput.buffer = machine.soundBuffer;



            // *** Connection


            // Before rebuilding a graph, we disconnect everything
            machine.soundInput.disconnect();
            machine.soundOutput.disconnect();

            var l = machine.filters.length;

            for(var i = 0 ; i < l ; i++) {
                machine.filters[i].audioNode.disconnect();
                machine.filters[i].analyser.disconnect();
            }


            // IF we got filters, well.. we connect them !
            if (l > 0)
            {
                console.log("filters. Connecting everything together...");

                // Connecting all the filters in a big chain
                for(var i = 0 ; i < l-1 ; i++) {

                    graph = graph+i+"--->["+machine.filters[i].type+"]";
                    // Connect filter its analyzer (dead-end)
                    machine.filters[i].audioNode.connect(machine.filters[i].analyser);

                    // Connect filter to the next one
                    machine.filters[i].audioNode.connect(machine.filters[i + 1].audioNode);
                }

                // Connecting Input to first filter
                graph = "X--[Input]" + graph;
                machine.soundInput.connect(machine.filters[0].audioNode);

                graph = graph+i+"--->["+machine.filters[i].type+"]";

                //Connecting last filter to its alnalyze( dead-end)
                machine.filters[l-1].audioNode.connect(machine.filters[l-1].analyser);

                // Connecting Output to last filter analyzer
                machine.filters[l-1].audioNode.connect(machine.soundOutput);


                graph = graph+"--->[Output]";
            }
            //Otherwise, we just connect input and output together
            else
            {
                console.log("No filters. Connecting input and output...");
                graph = graph+"--->[Output]";
                machine.soundInput.connect(machine.soundOutput);
            }

            console.log("FINAL GRAPH");
            console.log(graph);
        };

        // **** Audio Machine methods





    }]);