'use strict';

describe('Service: filter2', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var filter2;
  beforeEach(inject(function (_filter2_) {
    filter2 = _filter2_;
  }));

  it('should do something', function () {
    expect(!!filter2).toBe(true);
  });

});
