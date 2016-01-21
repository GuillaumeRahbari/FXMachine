'use strict';

describe('Service: ExpireDate', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var ExpireDate;
  beforeEach(inject(function (_ExpireDate_) {
    ExpireDate = _ExpireDate_;
  }));

  it('should do something', function () {
    expect(!!ExpireDate).toBe(true);
  });

});
