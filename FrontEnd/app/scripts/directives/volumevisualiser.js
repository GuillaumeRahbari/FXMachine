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
            scope: {orientation: '=', analyserNode: '='},
            controller: function($scope, $element, $timeout){



                // TODO : c'est pas trop trop propre, essayer that link
                // http://thecodeplayer.com/walkthrough/5b66bac8ec98ba14a80ca0c83169d51f



                // The canvas context, used to draw stuff in the canvas
                var ctx = $element[0].getContext('2d');


                // gradient element for the meter
                var meterColor;

                var backgroundColor = 'rgb(230, 230, 230)';

                if($scope.orientation =="horizontal")
                {
                    meterColor = ctx.createLinearGradient(0,0,ctx.canvas.width,0);
                    // Saturation value

                    // Normal value
                    meterColor.addColorStop(0,'rgb(42, 140, 252)');
                    meterColor.addColorStop(0.9,'rgb(42, 140, 252)');
                    meterColor.addColorStop(1,"red");
                }
                else if($scope.orientation == "vertical")
                {
                    meterColor = ctx.createLinearGradient(0,0,0,10);
                    // Saturation value

                    // Normal value
                    meterColor.addColorStop(1,'rgb(42, 140, 252)');
                    meterColor.addColorStop(0.1,'rgb(42, 140, 252)');
                    meterColor.addColorStop(0,"red");

                }
                else
                {
                    console.error("bad orientation given !");
                    console.log($scope.orientation);
                }




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
                    if($scope.orientation == "vertical")
                    {
                        // 255 ; maximum value from getByteTimeDomainData
                        var volume = averageVolume(array)*ctx.canvas.height / (100);


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
                    }
                    else if($scope.orientation == 'horizontal')
                    {
                        var volume = averageVolume(array)*ctx.canvas.width /100;


                        // Cleaning previous visualisation (redrawing background
                        ctx.fillStyle = backgroundColor;
                        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                        ctx.fillStyle = meterColor;

                        // Variable meterWidth depending on canvas width to fill it
                        var meterWidth = (ctx.canvas.height);

                        //for (var i = 1 ; i < array.length; i+=meterWidth)
                        {

                            ctx.fillRect(0, 0, volume/2, meterWidth);
                        }
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

    });
