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
          console.log("element: ",element);
          element.text('this is the connectable directive');
          jsPlumb.makeTarget(element, {
            anchor: 'Continuous',
            endpoint:"Rectangle",
            paintStyle:{ fillStyle:"gray" },
            maxConnections: 2
          })
        });
      }
    };
  });
