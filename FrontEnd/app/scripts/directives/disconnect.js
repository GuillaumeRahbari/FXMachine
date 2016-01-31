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
          element.click(function () {
              JsPlumb.removeAllEndpoints(element.parent().children(0)[0]);
              JsPlumb.removeAllEndpoints(element.parent().children(0)[2]);
          });
      }
    };
  });
