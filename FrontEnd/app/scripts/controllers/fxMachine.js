/**
 * Created by maxime on 12/16/15.
 */


'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:fxMachineCtrl
 */
angular.module('frontEndApp')
    .controller('fxMachineCtrl',['$scope', 'Filter', 'Sound', 'WebAudio', 'Pedal', 'JsPlumb', function ($scope, Filter, Sound, WebAudio, Pedal,JsPlumb) {

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
            console.log("add pedal!!");
            pedals.push(new Pedal(webaudio));
        };

        /**
         * This function removes a pedal from the pedal list.
         * @param {Pedal} ped - The pedal to be removed.
         */
        self.removePedal = function(ped)
        {
            var index = this.pedals.indexOf(ped);
            JsPlumb.remove(ped);

            if (index > -1){
                // removing the pedal
                this.pedals.splice(index,1);
                console.info("pedal removed");
            }
            else
            {
                console.warn("no pedal to remove");
            }
        };

        /**
         * Load pedal in webaudio service, and launch the audio
         * @param ped
         */
        self.loadPedalToWebAudio = function(ped)
        {
            if(webaudio.isInitialized)
            {
                console.log("loading pedal");

                // TODO : temporaire. a terme, les connexions seront binded avec la vue du graph jsplumb, ou alors on fera la connexion manuellement ici
                ped.cleanConnexions();
                ped.connectFiltersInChain();

                console.log("send stuff to webaudio");

                //****************************************
                // la methode s'occupe elle meme de tout connecter ensuite
                // We work with a copy of the array, just to be sure that above here, we won't alterate our beautiful pedal
                // (main point of this architecture btw)
                var filtersArray = ped.filters.slice();
                filtersArray.push(ped.input); // Because we also need to connect input to the stuff
                filtersArray.push(ped.output);

                webaudio.loadGraph(filtersArray, ped.input, ped.output);
            }
            else
            {
                console.warn("Webaudio not initialised yet, not loading any graph until it is");
            }

        };





    }]);