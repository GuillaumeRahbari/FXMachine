'use strict';

describe('Service: WebAudioSrv', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var WebAudioSrv;
  beforeEach(inject(function (_WebAudioSrv_) {
    WebAudioSrv = _WebAudioSrv_;
  }));

  it('should do something', function () {
    expect(!!WebAudioSrv).toBe(true);
  });

});
