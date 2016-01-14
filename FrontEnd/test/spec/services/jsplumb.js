'use strict';

describe('Service: JsPlumb', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var JsPlumb;
  beforeEach(inject(function (_JsPlumb_) {
    JsPlumb = _JsPlumb_;
  }));

  it('should do something', function () {
    expect(!!JsPlumb).toBe(true);
  });

});
