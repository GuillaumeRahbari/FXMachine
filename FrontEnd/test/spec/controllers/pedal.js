'use strict';

describe('Controller: PedalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var PedalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PedalCtrl = $controller('PedalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PedalCtrl.awesomeThings.length).toBe(3);
  });
});
