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
              $scope.link=function(){
                  var tmp= $scope.filter.audioNode.attack.value;
                  tmp= Math.round(tmp*100)/100;
                  $scope.dynamicCompressorValue=tmp;
              }
          }
      };
    });
