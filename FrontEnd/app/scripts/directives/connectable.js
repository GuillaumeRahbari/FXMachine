'use strict';

/**
 * This directive allows an element to be connectable.
 *
 * To use it you just need to add the attribute 'connectable' to an element.
 *
 * @ngdoc directive
 * @name frontEndApp.directive:connectable
 * @description
 * # connectable
 */
angular.module('frontEndApp')
  .directive('connectable', function (JsPlumb) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs)  {
        JsPlumb.makeTarget(element, {
          anchor: 'Continuous',
          endpoint:"Rectangle"
        });
      }
    };
  });
