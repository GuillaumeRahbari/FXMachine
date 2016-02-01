'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterDynamiccompressor
 * @description
 * # filterDynamiccompressor
 */
angular.module('frontEndApp')
    .directive('filterDynamiccompressor', function () {
      return {
        templateUrl: '../../../views/templates/filterDynamiccompressorTmpl.html',
        restrict: 'E',
        replace: true,
        scope: {
          filter : '='
        },
          controller:function($scope){
              $scope.linkAttack=function(){
                  $scope.dynamicCompressorAttackValue= Math.round($scope.filter.audioNode.attack.value*100)/100;
              }
              $scope.linkRelease=function(){
                  $scope.dynamicCompressorReleaseValue= Math.round($scope.filter.audioNode.release.value*100)/100;
              }
          },
          link:function(scope){
              scope.dynamicCompressorAttackValue=0.5;
              scope.dynamicCompressorReleaseValue=0.25;
          }
      };
    });
