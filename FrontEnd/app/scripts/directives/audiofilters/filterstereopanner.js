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
            templateUrl: '../../../views/templates/filterStereopannerTmpl.html',
            restrict: 'E',
            replace: true,
            scope: {
                filter: '='
            },
            controller: function ($scope) {
                $scope.linkPanValue = function () {
                    $scope.panValue = Math.round($scope.filter.audioNode.pan.value * 100) / 100;
                }
            },
            link: function (scope) {
                scope.panValue = 1;
            }
        };
    });
