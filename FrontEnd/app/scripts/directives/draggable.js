'use strict';

/**
 * This directive allows an element to be draggable.
 * It requires that the element and his parent have the property 'position: absolute'.
 * So the element is only draggable in the parent container.
 *
 * To use it you just need to add the attribute 'draggable' to an element.
 *
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
                JsPlumb.draggable(element,{
                    containment: 'parent',
                    drag : function () {
                        JsPlumb.revalidate(element.children(0).children(2));
                    },
                    stop : function () {
                        JsPlumb.revalidate(element.children(0).children(2));
                    }
                });
            }
        };
    });
