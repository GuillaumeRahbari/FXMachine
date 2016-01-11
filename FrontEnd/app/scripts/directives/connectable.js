'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:connectable
 * @description
 * # connectable
 */
angular.module('frontEndApp')
  .directive('connectable', function (JsPlumb) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        jsPlumb.ready(function(){
          jsPlumb.makeTarget(element, {
            anchor: 'Continuous',
            endpoint:"Rectangle",
            maxConnections: 1
          })
        });
      }
    };
  });
