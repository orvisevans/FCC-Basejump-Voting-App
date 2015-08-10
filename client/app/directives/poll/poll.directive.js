'use strict';

angular.module('workspaceApp')
  .directive('poll', function ($http, Auth) {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/poll/poll.html',
      scope: {
        votable: "@",
        linkable: "@",
        poll: "=pollObject"
      },
      link: function (scope, element, attrs) {
        scope.voteFor = function (answerIndex) {
          var userId = Auth.getCurrentUser()._id;
          if (!userId) {
            alert('You must log in before you can vote.');
          } else {
            var vote = {answerIndex: answerIndex, user: userId};
            $http.put('/api/polls/' + scope.poll._id + '/add-vote', vote);
            scope.poll.answers[answerIndex].votes.push(vote);
          }
        }
      }
    };
  });
