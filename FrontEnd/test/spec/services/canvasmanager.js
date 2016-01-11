'use strict';

describe('Service: canvasManager', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var canvasManager;
  beforeEach(inject(function (_canvasManager_) {
    canvasManager = _canvasManager_;
  }));

  it('should do something', function () {
    expect(!!canvasManager).toBe(true);
  });

});
