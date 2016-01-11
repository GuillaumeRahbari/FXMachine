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
            distorsion : '='
        },
          controller: function ($scope, $element, $timeout) {

              $scope.distorsion = 0;


              var ctx = $element[0].querySelector('#distovisualisation').getContext('2d');

              var canvasWidth = ctx.canvas.width;
              var canvasHeight = ctx.canvas.height;



              /**
               * Creates the curve needed for the waveshaper audionode
               * @param amount - the amount of distorsion we want
               * @returns {Float32Array} - the curve
               */
              var makeDistortionCurve = function(amount) {
                  var k =  amount  , n_samples = 44100,
                      curve = new Float32Array(n_samples),
                      deg = Math.PI / 180,
                      i = 0,
                      x;

                  for ( ; i < n_samples; ++i ) {
                      x = i * 2 / n_samples - 1;
                      curve[i] = ( k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) ); // avant c'etait (3+k)
                  }
                  return curve;
              };


              var drawCurve = function(curve)
              {
                  console.log("draw");
                  // ** Cleaning background
                  CanvasManager.drawBackground(ctx);
                  CanvasManager.drawGrid(ctx, 10,10);

                  var widthDrawStep = ctx.canvas.width / curve.length;

                  // console.log("frequencyhArray length" + frequencyArray.length);

                  //** Drawing disto response line
                  CanvasManager.setPrimaryLineStyle(ctx);

                  ctx.lineWidth=2;
                  ctx.beginPath();
                  ctx.moveTo(0,canvasHeight/2);

                   //   console.log("curve" + curve);
                  for(var i = 0; i <= curve.length-1;i++)
                  {
                      // magResponseOutput goes from 0 to 10 for a max amount of 100
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
                  console.log("update disto : " + $scope.distorsion);
                   var curve = makeDistortionCurve($scope.distorsion+0);

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

          }
      };
    }]);

