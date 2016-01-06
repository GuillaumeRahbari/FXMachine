'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:droppable
 * @description
 * # droppable
 */
angular.module('frontEndApp')
    .directive('droppable', function($compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            console.log("Make this element droppable");

            element.droppable({
                drop:function(event,ui) {
                    // angular uses angular.element to get jQuery element, subsequently data() of jQuery is used to get
                    // the data-identifier attribute
                    var dragIndex = angular.element(ui.draggable).data('identifier'),
                        dragEl = angular.element(ui.draggable),
                        dropEl = angular.element(this);

                    // if dragged item has class menu-item and dropped div has class drop-container, add module
                    if (dragEl.hasClass('menu-item') && dropEl.hasClass('drop-container')) {
                        console.log("Drag event on " + dragIndex);
                        var x = event.pageX - scope.module_css.width / 2;
                        var y = event.pageY - scope.module_css.height / 2;

                        scope.addModuleToSchema(dragIndex, x, y);
                    }

                    scope.$apply();
                }
            });
        }
    };
});