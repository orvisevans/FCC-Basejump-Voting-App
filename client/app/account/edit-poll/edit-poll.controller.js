'use strict';

angular.module('workspaceApp')
  .controller('EditPollCtrl', function ($scope, $http, Auth, User, $location, $routeParams) {
    var pollId = $routeParams.pollid;
    $scope.poll = 'loading poll';
    $http.get('/api/polls/' + pollId).success(function(data) {
      $scope.poll = data;

      //redirect to poll view if not the poll's author
      if (Auth.getCurrentUser()._id !== $scope.poll.author) {
        $location.path('/poll/' + pollId);
      }
    });

    //redirect to login if not logged in.
    if (!Auth.getCurrentUser().name) {
      $location.path('/login');
    }

    $scope.charsLeft = function (field, maxChars) {
      if (field.length <= maxChars) {
        return '' + maxChars - field.length + ' characters left';
      } else {
        return '' + (field.length - maxChars) + ' too many characters';
      }
    };

    $scope.addAnswer = function (atIndex) {
      $scope.poll.answers.splice(atIndex + 1, 0, {answer: '', votes: []});
    };

    $scope.removeAnswer = function (atIndex) {
      $scope.poll.answers.splice(atIndex, 1);
    };

    $scope.savePoll = function () {
      var newPoll = $scope.poll;
      $http.patch('/api/polls/' + pollId, {
        question: newPoll.question,
        dateCreated: Date.now(),
        answers: newPoll.answers,
        hiddenFromPublic: newPoll.hiddenFromPublic
      }).success(function(data) {
        $scope.poll._id = data._id;
        $scope.saved = true;
      });
    };
  });
