'use strict';

describe('Directive: filterDynamiccompressor', function () {

  // load the directive's module
  beforeEach(module('frontEndApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<filter-dynamiccompressor></filter-dynamiccompressor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the filterDynamiccompressor directive');
  }));
});
