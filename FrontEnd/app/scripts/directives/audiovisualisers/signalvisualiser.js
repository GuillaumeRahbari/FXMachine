'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:signalVisualiser
 * @description
 * # signalVisualiser
 */
angular.module('frontEndApp')
    .directive('signalVisualiser', ['canvasManager', function (CanvasManager) {
        return {
            restrict: 'A',
            scope : {analyserNode :'='},
            controller: function($scope, $element, $timeout){


                // The canvas context, used to draw stuff in the canvas
                var ctx = $element[0].getContext('2d');


                /**
                 * The main rendering loop for a audiovisualizer
                 */
                var draw = function()
                {

                    var array =  new Uint8Array($scope.analyserNode.frequencyBinCount);
                    // Utile.. pourquoi je sais pas encore
                    $scope.analyserNode.getByteTimeDomainData(array);


                    //console.log("draw");
                    //console.log("data"+array);


                    // ** Cleaning background
                    CanvasManager.drawBackground(ctx);


                    var widthDrawStep = ctx.canvas.width / array.length;

                    // console.log("frequencyhArray length" + frequencyArray.length);

                    //** Drawing style
                    CanvasManager.setPrimaryLineStyle(ctx);
                    ctx.lineWidth=2;

                    ctx.beginPath();
                    ctx.moveTo(0,ctx.canvas.heiht/2);

                    for(var i = 0; i <= array.length-1;i++)
                    {
                        // 0 value = 128, so we divide by 128
                        // and we center the thing on the canvas because positive and negative values
                        var line_y = array[i]*(ctx.canvas.height/2) / 128;
                        ctx.lineTo(i*widthDrawStep,  line_y);
                    }
                    ctx.stroke();
                    ctx.closePath();

                    // Re-looping
                    $timeout(draw, 60)

                };

                draw();
            }
        };

    }]);
