'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:plumbMenuItem
 * @description
 * # plumbMenuItem
 */
angular.module('frontEndApp')
    .directive('plumbItem', function() {
    return {
        replace: true,
        controller: 'PlumbCtrl',
        link: function (scope, element, attrs) {
            console.log("Add plumbing for the 'item' element");

            jsPlumb.makeTarget(element, {
                anchor: 'Continuous',
                maxConnections: 2,
            });
            jsPlumb.draggable(element, {
                containment: 'parent'
            });

            // this should actually done by a AngularJS template and subsequently a controller attached to the dbl-click event
            element.bind('dblclick', function(e) {
                jsPlumb.detachAllConnections($(this));
                $(this).remove();
                // stop event propagation, so it does not directly generate a new state
                e.stopPropagation();
                //we need the scope of the parent, here assuming <plumb-item> is part of the <plumbApp>
                scope.$parent.removeState(attrs.identifier);
                scope.$parent.$digest();
            });
        }
    };
});