'use strict';

describe('Service: WebAudio', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var WebAudio;
  beforeEach(inject(function (_WebAudio_) {
    WebAudio = _WebAudio_;
  }));

  it('should do something', function () {
    expect(!!WebAudio).toBe(true);
  });

});
