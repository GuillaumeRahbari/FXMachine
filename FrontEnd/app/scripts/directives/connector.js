'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:connector
 * @description
 * # connector
 */
angular.module('frontEndApp')
  .directive('connector', function (JsPlumb) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        element.text('this is the connector directive');
        JsPlumb.makeSource(element, {
          anchor:"Continuous",
          maxConnections:2,
          endPoint:"Rectangle"
        });
      }
    };
  });
