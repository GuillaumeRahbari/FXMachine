/**
 * Created by maxime on 12/16/15.
 */


'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:fxMachineCtrl
 * TODO : deplacer loadSound dans webaudio service (guigui, tu geres, parce que loadSound y'en a partout..)
 */
angular.module('frontEndApp')
    .controller('fxMachineCtrl',['$scope', 'Machine', 'Filter2', 'Sound', 'WebAudio', 'Pedal', function ($scope, Machine, Filter, Sound, WebAudio, Pedal) {

        var self = this;

        var webaudio = new WebAudio();
        this.webaudio = webaudio;

        var pedals = [];
        this.pedals = pedals;

        /**
         * Add a pedal
         */
        self.addPedal = function()
        {
            console.log("add pedal!!")
            pedals.push(new Pedal(webaudio));
        };

        /**
         * Remove a pedal
         */
        self.removePedal = function(ped)
        {
            var index = this.pedals.indexOf(ped);

            if (index > -1){
                // removing the pedal
                this.pedals.splice(index,1);
                console.info("pedal removed")
            }
            else
            {
                console.warn("no pedal to remove");
            }
        };


        /**
         * Load a sound
         * TODO : deplacer dans webaudio service
         */
        self.loadSound = function() {

            console.log("loadsong!")
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
         * Load pedal in webaudio service, and launch the audio
         * @param ped
         */
        self.loadPedalToWebAudio = function(ped)
        {
            console.log("loading pedal");

            // TODO : temporaire. a terme, les connexions seront binded avec la vue du graph jsplumb, ou alors on fera la connexion manuellement ici
            ped.cleanConnexions();
            ped.connectFiltersInChain();

            console.log("send stuff to webaudio")

            //****************************************
            // la methode s'occupe elle meme de tout connecter ensuite
            // We work with a copy of the array, just to be sure that above here, we won't alterate our beautiful pedal
            // (main point of this architecture btw)
            var filtersArray = ped.filters.slice();
            filtersArray.push(ped.input); // Because we also need to connect input to the stuff
            filtersArray.push(ped.output);

            webaudio.loadGraph(filtersArray, ped.input, ped.output);
        };


    }]);