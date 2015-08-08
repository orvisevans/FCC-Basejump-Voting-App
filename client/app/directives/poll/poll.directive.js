'use strict';

angular.module('workspaceApp')
  .directive('poll', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/poll/poll.html',
      scope: {
        linkable: "@",
        votable: "@",
        poll: "=pollObject"
      }
      // link: function (scope, element, attrs) {
      // },
    };
  });
