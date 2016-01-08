'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:volumeVisualiser
 * @description
 * # volumeVisualiser
 */
angular.module('frontEndApp')
  .directive('volumeVisualiser', function () {
      return {
        restrict: 'A',
        scope: {analyserNode: '='},
        controller: function($scope, $element, $timeout){


                    // The canvas context, used to draw stuff in the canvas
          var ctx = $element[0].getContext('2d');



          // gradient element for the meter
          var meterColor = ctx.createLinearGradient(0,0,0,10);
          // Saturation value
          meterColor.addColorStop(0,"red");
          // Normal value
          meterColor.addColorStop(1,'rgb(42, 140, 252)');
          var backgroundColor = 'rgb(230, 230, 230)';



          var average = function(array)
          {
            var result = 0;
            var l = array.length;
            for(var i = 0 ; i < l/10; i++)
            {
              result = result + array[i];
            }

            return 10*result/l;

          }
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

            var volume = average(array);


            // Cleaning previous visualisation (redrawing background
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.fillStyle = meterColor;

            // Variable meterWidth depending on canvas width to fill it
            var meterWidth = (ctx.canvas.width);

            //for (var i = 1 ; i < array.length; i+=meterWidth)
            {

              ctx.fillRect(0, ctx.canvas.height-volume/2, meterWidth, volume);
            }

            // Re-looping
            $timeout(draw, 60)

          };


          // First call to draw
          draw();

        }
      };

    });
