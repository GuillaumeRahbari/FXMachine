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
                  console.log(" start scope filter", $scope.filter.audioNode.attack.value);
                  var tmp= $scope.filter.audioNode.attack.value;
                  tmp= Math.round(tmp*100)/100;
                  console.log("tmp: ", tmp);
                  $scope.tmp=tmp;
                  $scope.filter.audioNode.attack.setValueAtTime(tmp,0);
                  //$scope.filter.audioNode.attack.value=tmp;
                  //$scope.filter.audioNode.attack.value*=0.01;
                  console.log(" end scope filter", $scope.filter.audioNode.attack.value);
              }
          }
      };
    });
