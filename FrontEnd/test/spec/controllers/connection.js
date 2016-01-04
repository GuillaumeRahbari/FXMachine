'use strict';

describe('Controller: ConnectionCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var ConnectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConnectionCtrl = $controller('ConnectionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConnectionCtrl.awesomeThings.length).toBe(3);
  });
});
