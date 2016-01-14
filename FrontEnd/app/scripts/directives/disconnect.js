'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:disconnect
 * @description
 * # disconnect
 */
angular.module('frontEndApp')
  .directive('disconnect', function (JsPlumb) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        JsPlumb.remove(element);
      }
    };
  });
