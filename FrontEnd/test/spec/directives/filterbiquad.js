'use strict';

describe('Directive: filterBiquad', function () {

  // load the directive's module
  beforeEach(module('frontEndApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<filter-biquad></filter-biquad>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the filterBiquad directive');
  }));
});
