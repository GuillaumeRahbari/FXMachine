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
        JsPlumb.ready(function(){
          element.text('this is the connectable directive');
          JsPlumb.makeTarget(element, {
            anchor: 'Continuous',
            maxConnections: 2
          })
        });
      }
    };
  });
