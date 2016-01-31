'use strict';

describe('Service: PedalSrv', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var PedalSrv;
  beforeEach(inject(function (_PedalSrv_) {
    PedalSrv = _PedalSrv_;
  }));

  it('should do something', function () {
    expect(!!PedalSrv).toBe(true);
  });

});
