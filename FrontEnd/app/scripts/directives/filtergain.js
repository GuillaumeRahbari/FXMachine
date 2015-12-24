'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterGain
 * @description
 * # filterGain
 */
angular.module('frontEndApp')
  .directive('filterGain', function () {
      return {
          templateUrl: 'views/templates/filterGainTmpl.html',
          restrict: 'E',
          replace: true,
          scope: {
              filter : '='
          }
      };
  });
