'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterDynamiccompressor
 * @description
 * # filterDynamiccompressor
 */
angular.module('frontEndApp')
    .directive('filterDynamiccompressor', function () {
      return {
        templateUrl: '../../../views/templates/filterDynamiccompressorTmpl.html',
        restrict: 'E',
        replace: true,
        scope: {
          filter : '='
        }


      };
    });
