'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:volumeVisualiser
 * @description
 * # volumeVisualiser
 */
angular.module('frontEndApp')
    .directive('volumeVisualiser',['canvasManager', function (CanvasManager) {
        return {
            restrict: 'A',
            scope: {orientation: '=', analyserNode: '='},
            controller: function($scope, $element, $timeout){


                // TODO : c'est pas trop trop propre, essayer that link
                // http://thecodeplayer.com/walkthrough/5b66bac8ec98ba14a80ca0c83169d51f


                // The canvas context, used to draw stuff in the canvas
                var ctx = $element[0].getContext('2d');


                var averageVolume = function(array)
                {
                    var values = 0;
                    var average;

                    var length = array.length;

                    // get all the frequency amplitudes
                    for (var i = 0; i < length; i++) {
                        values += array[i];
                    }

                    average = values / length;
                    return average;

                };

                /**
                 * The main rendering loop for a audiovisualizer
                 */
                var draw = function()
                {
                    //console.log("draw");
                    // Getting array of all frequency values
                    var array = new Uint8Array($scope.analyserNode.frequencyBinCount);
                    // Utile.. pourquoi je sais pas encore
                    $scope.analyserNode.getByteFrequencyData(array);

                    //console.log(array)

                    // Cleaning previous visualisation (redrawing background
                    CanvasManager.drawBackground(ctx);

                    CanvasManager.setMeterColor(ctx,$scope.orientation);

                    if($scope.orientation == "vertical")
                    {
                        // 255 ; maximum value from getByteTimeDomainData
                        var volume = averageVolume(array)*ctx.canvas.height / (100);

                        // Variable meterWidth depending on canvas width to fill it
                        var meterWidth = (ctx.canvas.width);

                        // Drawing the meter
                        ctx.fillRect(0, ctx.canvas.height-volume/2, meterWidth, volume);
                    }
                    else if($scope.orientation == 'horizontal')
                    {
                        var volume = averageVolume(array)*ctx.canvas.width /100;

                        // Variable meterWidth depending on canvas width to fill it
                        var meterWidth = (ctx.canvas.height);

                        // Drawing the meter
                        ctx.fillRect(0, 0, volume/2, meterWidth);
                    }
                    else
                    {
                        console.error('BAD ORIENTATION !');
                        console.error($scope.orientation);
                    }


                    // Re-looping
                    $timeout(draw, 60)

                };


                // First call to draw
                draw();

            }
        };

    }]);
