/**
 * Created by maxime on 12/16/15.
 */


'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:fxMachineCtrl
 */
angular.module('frontEndApp')
    .controller('fxMachineCtrl',['$scope', 'Machine', 'Filter2', 'Sound', 'WebAudio', 'Pedal', function ($scope, Machine, Filter, Sound, WebAudio, Pedal) {


        var self = this;


        // TODO : bug -> si la musique a reprise a zero, l'ajout d'un filtre va quand meme la faire repartir a la position d'ecoute d'avant
        // Note : the method init() is called when the controller is initialized.

        // The audio machine, containing all the stuff that we don't need to access from the html page (yet)


        var webaudio = new WebAudio();
        this.webaudio = webaudio;

        // Only one pedal for now
        var pedal = new Pedal(webaudio);
        this.pedal = pedal;


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

        // TODO :  a terme ici on ne fait QUE charger des graphes. la musique se lance directement depuis un bouton dans webaudio
        // l'operation de charger le graphe et de play/pause doivent etre separees



        /**
         * Load pedal in webaudio service, and launch the audio
         * @param ped
         */
        self.tryPedal = function(ped)
        {
            console.log("try pedal")
            ped.connectFilters();

            console.log("send stuff to webaudio")

            //****************************************
            // TODO : appeler webaudio.playSound avec la liste de filtres
            // la methode s'occupe elle meme de tout connecter ensuite
            // We work with a copy of the array, just to be sure that above here, we won't alterate our beautiful pedal
            // (main point of this architecture btw)
            var filtersArray = ped.filters.slice();
            filtersArray.push(ped.input); // Because we also need to connect input to the stuff
            webaudio.playSoundFromPedal(filtersArray, ped.input, ped.output);
        };


    }]);