'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:PedalCtrl
 * @description
 * # PedalCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
    .controller('PedalCtrl', ['WebAudio', 'Pedal', 'WebAudioSrv', function (WebAudio, Pedal, WebAudioSrv) {

        var self = this;

        self.sidebar = false;
        self.iconmenu=false;

        var webaudio = WebAudioSrv.getMainWebAudio();
        this.webaudio = webaudio;

        self.pedal = new Pedal(self.webaudio);

        /**
         * Load pedal in webaudio service, and launch the audio
         * @param ped
         */
        self.loadPedalToWebAudio = function (ped) {
            if (webaudio.isInitialized) {
                console.log("loading pedal");

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
            else {
                console.warn("Webaudio not initialised yet, not loading any graph until it is");
            }

        };

        self.updateMenu=function(){
            self.sidebar = !self.sidebar;
            console.log("side bar: ", self.sidebar);
            self.iconmenu = !self.iconmenu;
            console.log("icon menu: ", self.iconmenu);
        }
    }]);
