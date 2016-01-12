'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('frontEndApp')
    .directive('draggable', function (JsPlumb) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //JsPlumb.revalidate(element);
                console.log("element: ",element);
                JsPlumb.draggable(element,{
                    revert: true,
                });

            }
        };
    });
