'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterDetails
 * @description
 * # filterDetails
 */
angular.module('frontEndApp')
  .directive('filterDetails', function () {
    return {
      templateUrl: '../../views/templates/filterDetailsTmpl.html',
      restrict: 'E',
        scope: {
            filter : '='
        },
        controller : function ($scope, uuidGenerator) {
            $scope.uuid = uuidGenerator.generateUUID();

            $scope.show = false;

            $scope.showFilter = function () {
                angular.element('div[uuid=' + $scope.uuid + ']').collapse('show');
                $scope.show = true;
            };

            $scope.hideFilter = function () {
                angular.element('div[uuid=' + $scope.uuid + ']').collapse('hide');
                $scope.show = false;
            };

        }
    };
  });
