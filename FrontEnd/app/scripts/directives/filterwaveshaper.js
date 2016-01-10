'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterWaveshaper
 * @description
 * # filterWaveshaper
 */
angular.module('frontEndApp')
    .directive('filterWaveshaper', function () {
      return {
        templateUrl: 'views/templates/filterWaveshaperTmpl.html',
        restrict: 'E',
        replace: true,
        scope: {
          filter : '='
        }
      };
    });

