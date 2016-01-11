'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterBiquad
 * @description
 * # filterBiquad
 */
angular.module('frontEndApp')
    .directive('filterBiquad', function () {
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

                var canvasWidth = ctx.canvas.width;
                var canvasHeight = ctx.canvas.height;

                // STYLE ELEMENTS



                var textFillStyle =  'rgb(0, 0, 0)';
                var backgroundFillStyle = 'rgb(230, 230, 230)';
                var frequencyLineStyle = 'rgb(255, 100, 100)';
                var zeroValueFillStyle = 'rgb(0, 0, 0)';





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
                    ctx.fillStyle = backgroundFillStyle;

                    ctx.fillRect(0,0,canvasWidth,canvasHeight);

                    var widthDrawStep = canvasWidth / frequencyArray.length;

                    // console.log("frequencyhArray length" + frequencyArray.length);





                    //** Drawing frequency response line
                    ctx.strokeStyle = frequencyLineStyle;
                    ctx.fillStyle = frequencyLineStyle;
                    ctx.lineWidth=2;
                    ctx.beginPath();
                    ctx.moveTo(0,canvasHeight/2);

                    
                    for(var i = 0; i <= frequencyArray.length-1;i++)
                    {
                        // magResponseOutput goes from 0 to 1. We rescale to half of size, to handle saturatio
                        var meterHeight = magResponseOutput[i]*(canvasHeight/2);
                        ctx.lineTo(i*widthDrawStep, canvasHeight - meterHeight);
                        // listItem.innerHTML = '<strong>' + frequencyArray[i] + 'Hz</strong>: Magnitude ' + magResponseOutput[i] + ', Phase ' + phaseResponseOutput[i] + ' radians.';
                    }
                    ctx.stroke();


                    // Zero dB line
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = zeroValueFillStyle;
                    ctx.fillStyle = zeroValueFillStyle;
                    ctx.moveTo(0,canvasHeight/2);
                    ctx.lineTo(canvasWidth,canvasHeight/2);
                    ctx.stroke();

                    // Drawing frequency legend
                    ctx.fillStyle = textFillStyle;
                    ctx.font = "10px Arial";
                    ctx.fillText(frequencyArray[0]+'Hz',0,canvasHeight-10);
                    ctx.fillText(frequencyArray[frequencyArray.length-1]+'Hz',canvasWidth-50,canvasHeight-10);

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
    });
