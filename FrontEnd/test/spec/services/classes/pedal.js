'use strict';

describe('Service: Pedal', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var Pedal;
  beforeEach(inject(function (_Pedal_) {
    Pedal = _Pedal_;
  }));

  it('should do something', function () {
    expect(!!Pedal).toBe(true);
  });

});
