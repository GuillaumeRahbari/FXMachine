'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterDelay
 * @description
 * # filterDelay
 */
angular.module('frontEndApp')
    .directive('filterDelay', function () {
      return {
        templateUrl: 'views/templates/filterDelayTmpl.html',
        restrict: 'E',
        replace: true,
        scope: {
          filter : '='
        }
      };
    });
