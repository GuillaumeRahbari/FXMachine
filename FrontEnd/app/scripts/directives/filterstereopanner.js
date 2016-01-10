'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterStereopanner
 * @description
 * # filterStereopanner
 */
angular.module('frontEndApp')
    .directive('filterStereopanner', function () {
      return {
        templateUrl: 'views/templates/filterStereopannerTmpl.html',
        restrict: 'E',
        replace: true,
        scope: {
          filter : '='
        }
      };
    });
