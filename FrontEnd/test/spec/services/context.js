'use strict';

describe('Service: Context', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var Context;
  beforeEach(inject(function (_Context_) {
    Context = _Context_;
  }));

  it('should do something', function () {
    expect(!!Context).toBe(true);
  });

});
