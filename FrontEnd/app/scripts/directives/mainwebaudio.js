'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:mainWebAudio
 * @description
 * # mainWebAudio
 */
angular.module('frontEndApp')
  .directive('mainWebAudio', function () {
    return {
      templateUrl: '../../views/templates/mainWebAudioTmpl.html',
      restrict: 'E',

      link: function postLink(scope, element, attrs) {
        //element.text('this is the MainWebAudio directive');
      }
    };
  });
