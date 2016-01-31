'use strict';

/**
 * This directive allows an element to be a connector.
 *
 * To use it you just need to add the attribute 'connector' to an element.
 *
 * The connector corresponds to the 'out'.
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
               scope   : {
                   filter: '='
               },
               link    : function (scope, element, attrs) {
                   JsPlumb.makeSource(element, {
                       //parent:element.parent(),
                       anchor  : "Continuous",
                       endPoint: "Rectangle"
                   });
                   JsPlumb.bind('connection', function (info) {
                       var tmp = angular.element(info.target).attr('uuid');
                       scope.filter.addOutput(tmp);
                       console.log(scope.filter);
                   });
               }
           };
       });
