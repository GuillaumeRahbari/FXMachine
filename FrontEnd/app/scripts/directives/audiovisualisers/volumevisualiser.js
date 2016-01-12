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

                var legendMargin = 0; // 20px for writing stuff.



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



                    var volume = -30;
                    for(var i = 0; i < array.length; i++){
                        volume = array[i] > volume ? array[i] : volume;
                    }
                    //convert from magitude to decibel
                    var db = 20*Math.log(Math.max(volume,Math.pow(10,-72/20)))/Math.LN10;
                    db = Math.round(db*100/100);

                    var dbText = db > 0 ? '+'+db+'dB' : db+'dB';


                    if($scope.orientation == "vertical")
                    {

                        // Keeping a small margin
                        var meterHeight = volume * (ctx.canvas.height-legendMargin) / 255 ;
                        // Variable meterWidth depending on canvas width to fill it
                        var meterWidth = (ctx.canvas.width);


                        CanvasManager.setMeterColor(ctx,$scope.orientation);
                        // Drawing the meter
                        ctx.fillRect(0, ctx.canvas.height-legendMargin-meterHeight, meterWidth, meterHeight);


                        CanvasManager.setTextColorStyle(ctx);
                        ctx.font = "8px Arial";
                        ctx.fillText(dbText,0,ctx.canvas.height*0.975);
                    }
                    else if($scope.orientation == 'horizontal')
                    {


                        // Variable meterWidth depending on canvas width to fill it
                        var meterWidth = volume * (ctx.canvas.width-legendMargin) / 255 ;

                        var meterHeight = (ctx.canvas.height);

                        // Drawing the meter
                        CanvasManager.setMeterColor(ctx,$scope.orientation);
                        ctx.fillRect(legendMargin, 0, meterWidth, meterHeight );

                        CanvasManager.setTextColorStyle(ctx);
                        ctx.font = "8px Arial";
                        ctx.fillText(dbText,0,ctx.canvas.height*0.65);
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
