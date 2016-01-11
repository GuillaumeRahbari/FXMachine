'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterBiquad
 * @description
 * # filterBiquad
 */
angular.module('frontEndApp')
  .directive('filterBiquad', function () {
      return {
          templateUrl: '../../../views/templates/filterBiquadTmpl.html',
          restrict: 'E',
          replace: true,
          scope: {
              filter : '='
          }
      };
  });
