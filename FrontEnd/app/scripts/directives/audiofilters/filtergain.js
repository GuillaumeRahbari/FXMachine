'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterGain
 * @description
 * # filterGain
 */
angular.module('frontEndApp')
  .directive('filterGain', function () {
      return {
          templateUrl: '../../../views/templates/filterGainTmpl.html',
          restrict: 'E',
          replace: true,
          scope: {
              filter : '='
          },
          controller:function($scope){
              $scope.increaseValue = function () {
                  if($scope.filter.audioNode.gain.value<101){
                      $scope.filter.audioNode.gain.value += 1;
                      $scope.gainValue = (Math.round($scope.filter.audioNode.gain.value * 100) / 100);
                  }
              }
              $scope.reduceValue = function () {
                  if ($scope.filter.audioNode.gain.value > 0) {
                      $scope.filter.audioNode.gain.value -= 1;
                      $scope.gainValue = (Math.round($scope.filter.audioNode.gain.value * 100) / 100);
                  }
                  if($scope.filter.audioNode.gain.value==0){
                      $scope.gainValue = "Son coupé";
                  }
              }
          }
      };
  });
