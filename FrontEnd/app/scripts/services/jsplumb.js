'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.JsPlumb
 * @description
 * # JsPlumb
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('JsPlumb', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
      return  jsPlumb.getInstance();
  });
