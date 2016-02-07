'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:PedalCtrl
 * @description
 * # PedalCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
    .controller('PedalCtrl', ['WebAudio', 'Pedal', 'WebAudioSrv', 'PedalSrv', 'pedal', function (WebAudio, Pedal, WebAudioSrv, PedalSrv, pedal) {

        var self = this;

        self.sidebar = false;
        self.iconmenu=false;

        console.log("Allo")
        var webaudio = WebAudioSrv.getMainWebAudio();
        this.webaudio = webaudio;
        console.log("Allo")
        // TODO Max, ici y'a la pedal qu'on veut editer. Faut connecter maintenant.
        // self.pedal = pedal;
        self.pedal = new Pedal(self.webaudio);
console.log("Allo")
        /**
         * Load the pedal in webaudio service, and launch the audio
         */
        self.loadPedalToWebAudio = function () {
            if (webaudio.isInitialized) {
                console.log("loading pedal");
                console.log("send stuff to webaudio");
                console.log("If it works it's crazy.");

                //****************************************
                // la methode s'occupe elle meme de tout connecter ensuite
                // We work with a copy of the array, just to be sure that above here, we won't alterate our beautiful pedal
                // (main point of this architecture btw)

                var filtersArray = self.pedal.filters.slice();
                // TODO : faire une copie de input et output
                filtersArray.push(self.pedal.input); // Because we also need to connect input to the stuff
                filtersArray.push(self.pedal.output);
                webaudio.loadGraph(filtersArray, self.pedal.input, self.pedal.output);

            }
            else {
                console.warn("Webaudio not initialised yet, not loading any graph until it is");
            }

        };

        self.save = function () {
            PedalSrv.updatePedal(self.pedal);
        };

        self.updateMenu=function(){
            self.sidebar = !self.sidebar;
            console.log("side bar: ", self.sidebar);
            self.iconmenu = !self.iconmenu;
            console.log("icon menu: ", self.iconmenu);
        };

        self.getAllFilters=function()
        {
            var array = [self.pedal.input];
            for(var i = 0 ; i < self.pedal.filters.length ; i++)
            {
             array.push(self.pedal.filters[i]);
            }
            array.push(self.pedal.output);
            return array;
        }
    }]);
