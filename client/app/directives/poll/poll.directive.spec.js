'use strict';

describe('Directive: poll', function () {

  // load the directive's module and view
  beforeEach(module('workspaceApp'));
  beforeEach(module('app/directives/poll/poll.html'));

  // var element, scope;
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<poll></poll>');
  //   element = $compile(element)(scope);
  //   scope.$apply();
  //   expect(element.text()).toBe('this is the poll directive');
  // }));
});
