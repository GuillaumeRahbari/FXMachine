'use strict';

describe('Controller: ProfilCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var ProfilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilCtrl = $controller('ProfilCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfilCtrl.awesomeThings.length).toBe(3);
  });
});
