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
      restrict: 'A',
      link: function (scope, element, attrs) {
        jsPlumb.makeSource(element.parent(), {
            
          anchor:"Continuous",
          endPoint:"Rectangle",
          maxConnections:1
        });
      }
    };
  });
