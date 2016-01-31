'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.PedalSrv
 * @description
 * # PedalSrv
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('PedalSrv', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
