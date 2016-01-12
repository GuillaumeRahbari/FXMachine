'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:plumbMenuItem
 * @description
 * # plumbMenuItem
 */
angular.module('frontEndApp')
  .directive('plumbMenuItem', function (JsPlumb) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          JsPlumb.draggable(element, {
              containment: element.parent()
          });
      }
    };
  });
