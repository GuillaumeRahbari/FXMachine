'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterWaveshaper
 * @description
 * # filterWaveshaper
 */
angular.module('frontEndApp')
    .directive('filterWaveshaper', function () {
      return {
        templateUrl: '../../../views/templates/filterWaveshaperTmpl.html',
        restrict: 'E',
        replace: true,
        scope: {
          filter : '=',
            distorsion : '='
        },
          controller: function ($scope, $timeout) {

              $scope.distorsion = 0;


              /**
               * Creates the curve needed for the waveshaper audionode
               * @param amount - the amount of distorsion we want
               * @returns {Float32Array} - the curve
               */
              var makeDistortionCurve = function(amount) {
                  var k = typeof amount === 'number' ? amount : 50, n_samples = 44100,
                      curve = new Float32Array(n_samples),
                      deg = Math.PI / 180,
                      i = 0,
                      x;

                  for ( ; i < n_samples; ++i ) {
                      x = i * 2 / n_samples - 1;
                      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
                  }
                  return curve;
              };

              /**
               * Updates the value of the audioNode
               */
              var update = function()
              {
                  console.log("update disto : " + $scope.distorsion);
                   var curve = makeDistortionCurve($scope.distorsion);

                  $scope.filter.audioNode.curve = curve;
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
    });

