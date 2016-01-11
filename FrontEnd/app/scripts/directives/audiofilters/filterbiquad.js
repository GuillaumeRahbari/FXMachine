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
              var ctx = $element[0].querySelector('#biquadvisualisation').getContext('2d')

              var canvasWidth = ctx.canvas.width;
              var canvasHeight = ctx.canvas.height;

              // STYLE ELEMENTS
              ctx.lineWidth = 1;
             // ctx.strokeStyle = 'rgb(42, 140, 252)';
              ctx.fillStyle = 'rgb(230, 230, 230)';
              var textFillStyle =  'rgb(0, 0, 0)';
              var backgroundFillStyle = 'rgb(230, 230, 230)';
              var barFillStyle = 'rgb(42, 140, 252)';
              var zeroValueFillStyle = 'rgb(200, 0, 0)';





              var draw = function()
              {
                  var frequencyArray = new Float32Array(40);
                  for(var i = 0 ; i < frequencyArray.length ; i++)
                  {
                      frequencyArray[i] = i*500
                  }

                  var magResponseOutput = new Float32Array(40);
                  var phaseResponseOutput = new Float32Array(40);

                  $scope.filter.audioNode.getFrequencyResponse(frequencyArray,magResponseOutput,phaseResponseOutput);



                  ctx.fillStyle = backgroundFillStyle;
                  ctx.fillRect(0,0,canvasWidth,canvasHeight);

                  var widthDrawStep = canvasWidth / frequencyArray.length;

                 // console.log("frequencyhArray length" + frequencyArray.length);
                  ctx.font = "10px Arial";



                  for(var i = 0; i <= frequencyArray.length-1;i++)
                  {



                      ctx.fillStyle = barFillStyle;
                      // magResponseOutput goes from 0 to 1
                      var meterWidth = magResponseOutput[i]*(canvasHeight/2);//

                      ctx.fillRect(i*widthDrawStep, canvasHeight - meterWidth, widthDrawStep, meterWidth);



                      //ctx.fillStyle = textFillStyle;
                      //ctx.fillText(frequencyArray[i]+'Hz',i*widthDrawStep,canvasHeight-10);

                      ctx.fillStyle = zeroValueFillStyle;
                      ctx.moveTo(0,canvasHeight/2);
                      ctx.lineTo(canvasWidth,canvasHeight/2);
                      ctx.stroke();
                      // listItem.innerHTML = '<strong>' + frequencyArray[i] + 'Hz</strong>: Magnitude ' + magResponseOutput[i] + ', Phase ' + phaseResponseOutput[i] + ' radians.';

                  }


                  ctx.fillStyle = textFillStyle;
                  ctx.fillText(frequencyArray[0]+'Hz',0,canvasHeight-10);
                  ctx.fillText(frequencyArray[frequencyArray.length-1]+'Hz',canvasWidth-20,canvasHeight-10);


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
