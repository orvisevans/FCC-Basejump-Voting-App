'use strict';

describe('Controller: CreatePollCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var CreatePollCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatePollCtrl = $controller('CreatePollCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
