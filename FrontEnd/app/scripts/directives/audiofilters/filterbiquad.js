'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterBiquad
 * @description
 * # filterBiquad
 */
angular.module('frontEndApp')
    .directive('filterBiquad',['canvasManager', function (CanvasManager) {
        return {
            templateUrl: '../../../views/templates/filterBiquadTmpl.html',
            restrict: 'E',
            replace: true,
            scope: {
                filter : '='
            },
            controller: function($scope, $element, $timeout)
            {
                console.log("controller biquad !");
                var ctx = $element[0].querySelector('#biquadvisualisation').getContext('2d');


                var textFillStyle =  'rgb(0, 0, 0)';



                var draw = function()
                {
                    // Setting up the array values we want, and the array containers
                    var frequencyArray = new Float32Array(100);
                    for(var i = 0 ; i < frequencyArray.length ; i++)
                    {

                        frequencyArray[i] = i*40
                    }

                    // Frequency response
                    var magResponseOutput = new Float32Array(100);
                    // Phase response
                    var phaseResponseOutput = new Float32Array(100);

                    // Getting frequency response
                    $scope.filter.audioNode.getFrequencyResponse(frequencyArray,magResponseOutput,phaseResponseOutput);

                    //******** DRAW !

                    // ** Cleaning background
                    CanvasManager.drawBackground(ctx);

                    var widthDrawStep = ctx.canvas.width / frequencyArray.length;

                    // console.log("frequencyhArray length" + frequencyArray.length);





                    //** Drawing frequency response line
                    CanvasManager.setPrimaryLineStyle(ctx);
                    ctx.lineWidth=2;
                    ctx.beginPath();
                    ctx.moveTo(0,ctx.canvas.height/2);

                    
                    for(var i = 0; i <= frequencyArray.length-1;i++)
                    {
                        // magResponseOutput goes from 0 to 1. We rescale to half of size, to handle saturatio
                        var meterHeight = magResponseOutput[i]*(ctx.canvas.height/2);
                        ctx.lineTo(i*widthDrawStep, ctx.canvas.height - meterHeight);
                        // listItem.innerHTML = '<strong>' + frequencyArray[i] + 'Hz</strong>: Magnitude ' + magResponseOutput[i] + ', Phase ' + phaseResponseOutput[i] + ' radians.';
                    }
                    ctx.stroke();


                    // Zero dB line

                    CanvasManager.setSecondaryLineStyle(ctx);
                    ctx.lineWidth = 1;

                    ctx.moveTo(0,ctx.canvas.height/2);
                    ctx.lineTo(ctx.canvas.width,ctx.canvas.height/2);
                    ctx.stroke();

                    // Drawing frequency legend
                    CanvasManager.setTextColorStyle(ctx);
                    ctx.font = "10px Arial";
                    ctx.fillText(frequencyArray[0]+'Hz',0,ctx.canvas.height-10);
                    ctx.fillText(frequencyArray[frequencyArray.length-1]+'Hz',ctx.canvas.width-50,ctx.canvas.height-10);

                };

                /*
                 Watching for a buffer change (like a new sound has been loaded
                 */
                $scope.$watch('filter.audioNode.frequency.value', function(newValue)
                {
                    draw();
                });
                $scope.$watch('filter.audioNode.Q.value', function(newValue)
                {
                    draw();
                });
                $scope.$watch('filter.audioNode.gain.value', function(newValue)
                {
                    draw();
                });
                $scope.$watch('filter.audioNode.type', function(newValue)
                {
                    draw();
                })
            }
        };
    }]);
