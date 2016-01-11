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
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        JsPlumb.ready(function(){
          element.text('this is the connectable directive');
          JsPlumb.makeSource(element, {
            anchor:"Continuous",
            maxConnections:2,
            endPoint:"Rectangle"
          });

          JsPlumb.makeTarget(element, {
            isTarget:true,
            endPoint:"Rectangle"
          })
        });

      }
    };
  });
