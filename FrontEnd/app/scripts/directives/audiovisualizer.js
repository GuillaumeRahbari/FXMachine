'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:audioVisualizer
 * A simple audiovisualizer, not very robust yet, but at least it works
 * @description
 * # audioVisualizer
 */
angular.module('frontEndApp')
  .directive('audioVisualizer', function () {
    return {
      restrict: 'A',
        scope: {filter: '=filter', context: '=context'},
        controller: function($scope, $element, $timeout){


            // TODO : refaire au propre : les dimensions du canvas, la hauteur des traits... etc
            // TODO : cxt.height correspond pas a la hauteur du canvas.. comprendre why
            // TODO : pouvoir modifier la fftsize, choses du genre
            // TODO : pouvoir choisir plusieurs visualisations


            var ctx = $element[0].getContext('2d');


            // Meter gradient

            var grd=ctx.createLinearGradient(0,0,0,10);
            // Saturation value
            grd.addColorStop(0,"red");
            // Normal value
            grd.addColorStop(1,"#9ec7ff");
            ctx.fillStyle=grd;

            /**
             * The main rendering loop for a audiovisualizer
             */
            var draw = function()
            {
                // Getting array of all frequency values
                var array =  new Uint8Array($scope.filter.analyser.frequencyBinCount);
                $scope.filter.analyser.getByteFrequencyData(array); // Utile.. pourquoi je sais pas encore

                // Cleaning previous visualisation
                ctx.clearRect(0, 0, 2000, 2000);


                // TODO : ameliorer ça, prendre borne a borne, enfin bref faire un vrai truc propre
                for (var i = 1 ; i < array.length; i+=6)
                {
                   // ctx.fillRect(i, 0, 4,array[i]);//, 4, ctx.height); // Equalizer depuis le haut du canvas

                    // Equalizer depuis le bas du canvas : valeur 100 pour la hauteur TODO mettre la hauteur du canvas
                    ctx.fillRect(i, 100-array[i]/2, 4,array[i]);//, 4, ctx.height);
                }

                // Re-looping
                $timeout(draw, 60)

            };


            // First call to draw
            draw();

        }
    };
  });
