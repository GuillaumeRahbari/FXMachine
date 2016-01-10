'use strict';

describe('Service: uuidGenerator', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var uuidGenerator;
  beforeEach(inject(function (_uuidGenerator_) {
    uuidGenerator = _uuidGenerator_;
  }));

  it('should do something', function () {
    expect(!!uuidGenerator).toBe(true);
  });

});
