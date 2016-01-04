'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('frontEndApp')
    .directive('plumbConnect', function() {
    return {
        replace: true,
        link: function (scope, element, attrs) {
            console.log("Add plumbing for the 'connect' element");

            jsPlumb.makeSource(element, {
                parent: $(element).parent(),
//				anchor: 'Continuous',
                paintStyle:{
                    strokeStyle:"#225588",
                    fillStyle:"transparent",
                    radius:7,
                    lineWidth:2
                },
            });
        }
    };
});