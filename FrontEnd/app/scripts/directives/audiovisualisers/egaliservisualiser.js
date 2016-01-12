'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:audioVisualizer
 * A simple audiovisualizer, not very robust yet, but at least it works
 * @description
 * # audioVisualizer
 */
angular.module('frontEndApp')
  .directive('egaliserVisualizer',['canvasManager', function (CanvasManager) {
    return {
      restrict: 'A',
        scope: {analyserNode: '='},
        controller: function($scope, $element, $timeout){


            // TODO : fftsize depend du sampling rate. besoin d'avoir une bonne fftsize. need to be handled somewhere, but not here !

            // TODO : en tout petit c'est super moche. la hauteur des meters est mal geree. arranger ca.

            // The canvas context, used to draw stuff in the canvas
            var ctx = $element[0].getContext('2d');


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
                CanvasManager.drawBackground(ctx);

                CanvasManager.setMeterColor(ctx, "vertical");

                // Variable meterWidth depending on canvas width to fill it
                var meterWidth = $scope.analyserNode.fftSize / (ctx.canvas.width);

                var meterHeight = 0;

                for (var i = 1 ; i < array.length; i+=6)
                {
                    meterHeight = array[i];
                    // Equalizer depuis le bas du canvas
                    ctx.fillRect(i, ctx.canvas.height-array[i]/2, meterWidth, meterHeight);
                }

                CanvasManager.drawForeground(ctx);

                // Re-looping
                $timeout(draw, 60)

            };

                draw();



        }
    };

  }]);
