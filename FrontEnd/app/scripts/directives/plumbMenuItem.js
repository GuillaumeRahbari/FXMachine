'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:plumbMenuItem
 * @description
 * # plumbMenuItem
 */
angular.module('frontEndApp')
    .directive('plumbMenuItem', function() {
    return {
        replace: true,
        controller: 'PlumbCtrl',
        link: function (scope, element, attrs) {
            console.log("Add plumbing for the 'menu-item' element");

            // jsPlumb uses the containment from the underlying library, in our case that is jQuery.
            jsPlumb.draggable(element, {
                containment: element.parent().parent()
            });
        }
    };
});
