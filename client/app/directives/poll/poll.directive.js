'use strict';

angular.module('workspaceApp')
  .directive('poll', function () {
    return {
      templateUrl: 'app/directives/poll/poll.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });