'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterWaveshaper
 * @description
 * # filterWaveshaper
 */
angular.module('frontEndApp')
    .directive('filterWaveshaper',['canvasManager', function (CanvasManager) {
        return {
            templateUrl: '../../../views/templates/filterWaveshaperTmpl.html',
            restrict: 'E',
            replace: true,
            scope: {
                filter : '=',
                amount : '=',
                distotype :'=',
                harmonics : '=',
                fondfreq :'='
            },
            controller: function ($scope, $element, $timeout) {

                $scope.fondfreq = 5;
                // Initialising scope values
                $scope.amount = 1;
                $scope.distotype = "atan";

                $scope.harmonics = [0,0,0,0,0,0,0,0];


                var ctx = $element[0].querySelector('#distovisualisation').getContext('2d');


                /**
                 * Creates the curve needed for the waveshaper audionode
                 * @param amount - the amount of distorsion we want
                 * @returns {Float32Array} - the curve
                 */
                var makeAtanDistortionCurve = function(amount) {

                        var k =  amount  , n_samples = 44100,
                            curve = new Float32Array(n_samples),
                            deg = Math.PI / 180,
                            i = 0,
                            x;


                        for ( ; i < n_samples; ++i ) {
                            x = i * 2 / n_samples - 1;
                            //curve[i] = Math.sin(x);
                            curve[i] = ( k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) ); // avant c'etait (3+k)
                        }



                    return curve;
                };

                var makeChebyshevDistortionCurve = function(harmonics, fondamentalFreq)
                {
                    var n_samples = 44100,
                        curve = new Float32Array(n_samples),
                        i = 0,
                        x;


                    for ( ; i < n_samples; ++i ) {
                        x = i * 2 / n_samples - 1;
                        //curve[i] = Math.sin(x);

                        //f(x) = A sin(wt + p)
                        for(var u = 0 ; u < harmonics.length ; u++)
                        {
                            var w = (u+1)*fondamentalFreq;
                            var w = (u+1)*fondamentalFreq;
                            curve[i] += harmonics[u] * Math.sin(w*x);
                        }

                        // gestion de la saturation de curve
                        if(curve[i] > 1) curve[i] = 1;
                        if(curve[i] < -1) curve[i] = -1;

                    }

                    return curve;
                };



                var drawCurve = function(curve)
                {
                    //console.log("draw");

                    // We actually draw the result on a sin curve

                    // ** Cleaning background
                    CanvasManager.drawBackground(ctx);
                    CanvasManager.drawGrid(ctx, 10,10);


                    var widthDrawStep = ctx.canvas.width / curve.length;

                    // console.log("frequencyhArray length" + frequencyArray.length);

                    var maxValue = Math.max.apply(null, curve);
                    if(maxValue == 0) maxValue = 1; // If empty, we put it to 1 to draw a line

                    //** Drawing disto response line
                    CanvasManager.setPrimaryLineStyle(ctx);

                    ctx.lineWidth=2;
                    ctx.beginPath();
                    ctx.moveTo(0,ctx.canvas.height/2);

                      // console.log("curve" + curve);

                    for(var i = 0; i <= curve.length-1;i++)
                    {
                        // Actually no. it goes way higher
                        var meterHeight = curve[i]*(ctx.canvas.height/2);

                        ctx.lineTo(i*widthDrawStep, ctx.canvas.height/2 - meterHeight);
                    }
                    ctx.stroke();
                    ctx.closePath();

                };


                /**
                 * Updates the value of the audioNode
                 */
                var update = function()
                {
                    //console.log("update disto : " + $scope.distorsion);

                    var curve;

                    if($scope.distotype =="atan")
                       curve = makeAtanDistortionCurve($scope.amount);
                    else if($scope.distotype == "chebyshev")
                        curve = makeChebyshevDistortionCurve($scope.harmonics, $scope.fondfreq);
                    else
                        console.error("bad disto type given");



                    $scope.filter.audioNode.curve = curve;

                    drawCurve(curve);
                };


                /*
                 Watching for a change in the distorsion amount inputrange
                 */
                $scope.$watch('amount', function(newValue)
                {
                    update();
                });

                /*
                 Watching for a change in the harmonics inputrange
                 */
                $scope.$watch('harmonics', function(newValue)
                {
                    update();

                }, true);

                /*
                 Watching for a change in type
                 */
                $scope.$watch('distotype', function(newValue)
                {
                    update();

                }, true);


                /*
                 Watching for a change in fondamental frequency
                 */
                $scope.$watch('fondfreq', function(newValue)
                {
                    update();


                }, true);

            }
        };
    }]);

