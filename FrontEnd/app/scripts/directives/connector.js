'use strict';

/**
 * This directive allows an element to be a connector.
 *
 * To use it you just need to add the attribute 'connector' to an element.
 *
 * @ngdoc directive
 * @name frontEndApp.directive:connector
 * @description
 * # connector
 */
angular.module('frontEndApp')
  .directive('connector', function (JsPlumb) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        JsPlumb.makeSource(element, {
          anchor:"Continuous",
          endPoint:"Rectangle"
        });
      }
    };
  });
