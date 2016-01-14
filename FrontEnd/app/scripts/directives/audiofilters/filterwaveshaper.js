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
                distorsion : '=',
                distotype :'=',
                harmonics : '='
            },
            controller: function ($scope, $element, $timeout) {

                // Initialising scope values
                $scope.distorsion = 0;
                $scope.distotype = "atan";

                $scope.harmonics = [0,0,0,0,0,0,0,0];


                var ctx = $element[0].querySelector('#distovisualisation').getContext('2d');


                /**
                 * Creates the curve needed for the waveshaper audionode
                 * @param amount - the amount of distorsion we want
                 * @returns {Float32Array} - the curve
                 */
                var makeDistortionCurve = function(amount, harmonics, distorsionType) {

                    if(distorsionType == 'atan')
                    {

                        var k =  amount  , n_samples = 44100,
                            curve = new Float32Array(n_samples),
                            deg = Math.PI / 180,
                            i = 0,
                            x;

                        for ( ; i < n_samples; ++i ) {
                            x = i * 2 / n_samples - 1;
                            curve[i] = ( k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) ); // avant c'etait (3+k)
                        }
                    }
                    else if(distorsionType == 'chebyshev')
                    {
                        console.log("chebyshev make curve !");
                        var k =  amount  , n_samples = 44100,
                            curve = new Float32Array(n_samples),
                            deg = Math.PI / 180,
                            i = 0,
                            x;

                        for ( ; i < n_samples; ++i ) {

                            x = i * 2 / n_samples - 1;



                            var polys = new Float32Array(8);
                            polys[0] = 1;
                            polys[1] = x;
                            for (var u = 2 ; u < harmonics.length ; u++)
                            {
                                // tn = 2*x *t[n-1](x)- t[n-2](x)
                               polys[u] = 2*x + polys[u-1] - polys[u-2];
                            }


                            //  y = k0*T0(x) + k1*T1(x) + k2*T2(x) + k3*T3(x) + ...
                            curve[i] = 0;
                            for(var u = 0 ; u < harmonics.length ; u++)
                            {
                                curve[i] = curve[i] + harmonics[u] * polys[u];
                            }
                            //curve[i] = harmonics[0]*t0 + harmonics[1]*t1 + harmonics[2]*t2 + harmonics[3]*t3 + harmonics[4]*t4 + harmonics[5]*t5 + harmonics[6]*t6 + harmonics[7]*t7;


                            /* var t0 = 1;
                             var t1 = x;
                             var t2 = 2*Math.pow(x,2)-1;
                             var t3 = 4*Math.pow(x,3) - 3*x;
                             var t4 = 8*Math.pow(x,4) - 8*Math.pow(x,2) +1;
                             var t5 = 16*Math.pow(x,5) - 20*Math.pow(x,3) + 5*x;
                             var t6 = 32*Math.pow(x,6) - 48*Math.pow(x,4) + 18*Math.pow(x,2) -1;
                             var t7 = 64*Math.pow(x,7) -112 *Math.pow(x,5) + 160*Math.pow(x,4) -32*Math.pow(x,2) +1;
 */

                            // Looping on harmonics
                           // curve[i] = 0;
                           // curve[i] = harmonics[0]*t0 + harmonics[1]*t1 + harmonics[2]*t2 + harmonics[3]*t3 + harmonics[4]*t4 + harmonics[5]*t5 + harmonics[6]*t6 + harmonics[7]*t7;




                            //curve[i] = ( k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) ); // avant c'etait (3+k)
                        }

                    }
                    else
                    {
                        console.error("BAD VALUE DISTOTYPE");
                    }

                    return curve;
                };


                var drawCurve = function(curve)
                {
                    //console.log("draw");


                    // ** Cleaning background
                    CanvasManager.drawBackground(ctx);
                    CanvasManager.drawGrid(ctx, 10,10);


                    var widthDrawStep = ctx.canvas.width / curve.length;

                    // console.log("frequencyhArray length" + frequencyArray.length);

                    //var maxValue = Math.max.apply(null, curve);

                    //** Drawing disto response line
                    CanvasManager.setPrimaryLineStyle(ctx);

                    ctx.lineWidth=2;
                    ctx.beginPath();
                    ctx.moveTo(0,ctx.canvas.height/2);

                    //   console.log("curve" + curve);

                    for(var i = 0; i <= curve.length-1;i++)
                    {
                        // Actually no. it goes way higher
                        var meterHeight = curve[i]*(ctx.canvas.height/2) / 100; //maxValue;
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
                    console.log("update disto : " + $scope.distorsion);

                    var curve = makeDistortionCurve($scope.distorsion, $scope.harmonics, $scope.distotype);

                    $scope.filter.audioNode.curve = curve;

                    drawCurve(curve);
                };


                /*
                 Watching for a change in the distorsion inputrange
                 */
                $scope.$watch('distorsion', function(newValue)
                {
                    update();
                });

                /*
                 Watching for a change in the distorsion inputrange
                 */
                $scope.$watch('harmonics', function(newValue)
                {
                    update();

                }, true);

            }
        };
    }]);

