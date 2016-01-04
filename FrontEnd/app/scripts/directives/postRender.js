'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:plumbMenuItem
 * @description
 * # plumbMenuItem
 */
angular.module('frontEndApp')
    .directive('postRender', [ '$timeout', function($timeout) {
    var def = {
        restrict : 'A',
        terminal : true,
        transclude : true,
        link : function(scope, element, attrs) {
            $timeout(scope.redraw, 0);  //Calling a scoped method
        }
    };
    return def;
}]);