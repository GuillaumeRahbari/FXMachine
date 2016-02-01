'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterDelay
 * @description
 * # filterDelay
 */
angular.module('frontEndApp')
    .directive('filterDelay', function () {
      return {
        templateUrl: '../../../views/templates/filterDelayTmpl.html',
        restrict: 'E',
        replace: true,
        scope: {
          filter : '='
        },
          controller:function($scope){
              $scope.linkDelayTime=function(){
                  $scope.delayTime= Math.round($scope.filter.audioNode.delayTime.value*100)/100;
              }
          },
          link:function(scope){
              scope.delayTime=1;
          }
      };
    });
