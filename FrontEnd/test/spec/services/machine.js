'use strict';

describe('Service: Machine', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var Machine;
  beforeEach(inject(function (_Machine_) {
    Machine = _Machine_;
  }));

  it('should do something', function () {
    expect(!!Machine).toBe(true);
  });

});
