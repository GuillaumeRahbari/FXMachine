'use strict';

describe('Directive: volumeVisualiser', function () {

  // load the directive's module
  beforeEach(module('frontEndApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<volume-visualiser></volume-visualiser>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the volumeVisualiser directive');
  }));
});
