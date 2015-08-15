'use strict';

angular.module('workspaceApp')
  .directive('poll', function ($http, Auth) {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/poll/poll.html',
      scope: {
        votable: "@",
        linkable: "@",
        hideTally: "@",
        poll: "=pollObject"
      },
      link: function (scope, element, attrs) {
        scope.loggedIn = function () {
          return Auth.getCurrentUser().name ? true : false;
        }
        scope.votedFor = function (answerIndex) {
          var user = Auth.getCurrentUser()._id;
          if (user) {
            var votedForThis = false;
            scope.poll.answers[answerIndex].votes.forEach(function(vote) {
              if (vote.user === user) { votedForThis = true; }
            });
            return votedForThis;
          }
        }
        scope.voteFor = function (answerIndex) {
          var userId = Auth.getCurrentUser()._id;
          if (!userId) {
            alert('You must log in before you can vote.');
          } else {
            var vote = {answerIndex: answerIndex, user: userId};
            $http.put('/api/polls/' + scope.poll._id + '/add-vote', vote);
            removeVotesbyUser(scope.poll, userId);
            scope.poll.answers[answerIndex].votes.push({user: userId});
          }
        }
      }
    };
  });

  function removeVotesbyUser(poll, userId) {
    poll.answers = poll.answers.map(function(answer) {
      answer.votes = answer.votes.filter(function(vote) {
        return vote.user !== userId;
      });
      return answer;
    });
    return poll;
  }
