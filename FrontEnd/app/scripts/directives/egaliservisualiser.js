'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:audioVisualizer
 * A simple audiovisualizer, not very robust yet, but at least it works
 * @description
 * # audioVisualizer
 */
angular.module('frontEndApp')
  .directive('egaliserVisualizer', function () {
    return {
      restrict: 'A',
        scope: {analyzerNode: '='},
        controller: function($scope, $element, $timeout){



            // TODO : refaire au propre : les dimensions du canvas, la hauteur des traits... etc
            // TODO : cxt.height correspond pas a la hauteur du canvas.. comprendre why
            // TODO : pouvoir modifier la fftsize, choses du genre
            // TODO : pouvoir choisir plusieurs visualisations

            // The canvas context, used to draw stuff in the canvas
            var ctx = $element[0].getContext('2d');

            // gradient element for the meter
            var meterColor = ctx.createLinearGradient(0,0,0,10);
            // Saturation value
            meterColor.addColorStop(0,"red");
            // Normal value
            meterColor.addColorStop(1,'rgb(42, 140, 252)');
            var backgroundColor = 'rgb(230, 230, 230)';


            /**
             * The main rendering loop for a audiovisualizer
             */
            var draw = function()
            {
                console.log("draw");
                // Getting array of all frequency values
                var array =  new Uint8Array($scope.analyzerNode.frequencyBinCount);
                // Utile.. pourquoi je sais pas encore
                $scope.analyzerNode.getByteFrequencyData(array);

                // Cleaning previous visualisation
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, 2000, 2000);

                ctx.fillStyle = meterColor;

                // TODO : ameliorer ça, prendre borne a borne, enfin bref faire un vrai truc propre
                for (var i = 1 ; i < array.length; i+=6)
                {
                    // Equalizer depuis le haut du canvas
                   // ctx.fillRect(i, 0, 4,array[i]);//, 4, ctx.height);

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
