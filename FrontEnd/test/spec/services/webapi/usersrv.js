'use strict';

describe('Service: UserSrv', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var UserSrv;
  beforeEach(inject(function (_UserSrv_) {
    UserSrv = _UserSrv_;
  }));

  it('should do something', function () {
    expect(!!UserSrv).toBe(true);
  });

});
