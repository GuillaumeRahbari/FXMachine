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
        scope: {analyserNode: '='},
        controller: function($scope, $element, $timeout){



            // TODO : fftsize depend du sampling rate. besoin d'avoir une bonne fftsize. need to be handled somewhere, but not here !

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
                //console.log("draw");
                // Getting array of all frequency values
                var array =  new Uint8Array($scope.analyserNode.frequencyBinCount);
                // Utile.. pourquoi je sais pas encore
                $scope.analyserNode.getByteFrequencyData(array);

                // Cleaning previous visualisation (redrawing background
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.fillStyle = meterColor;

                // Variable meterWidth depending on canvas width to fill it
                var meterWidth = $scope.analyserNode.fftSize / (ctx.canvas.width);
                

                var meterHeight = 0;

                for (var i = 1 ; i < array.length; i+=6)
                {
                    meterHeight = array[i];

                    // Equalizer depuis le haut du canvas (!! OLD. pas de gestion de la largeur)
                   // ctx.fillRect(i, 0, 4,array[i]);//, 4, ctx.height);

                    // Equalizer depuis le bas du canvas
                    ctx.fillRect(i, ctx.canvas.height-array[i]/2, meterWidth, meterHeight);
                }

                // Re-looping
                $timeout(draw, 60)

            };


            // First call to draw
            draw();

        }
    };

  });
