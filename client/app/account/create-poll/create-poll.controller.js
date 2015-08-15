'use strict';

angular.module('workspaceApp')
  .controller('CreatePollCtrl', function ($scope, $http, Auth, User, $location) {
    $scope.poll = {};
    $scope.poll.answers = [{answer: '', votes: []}, {answer: '', votes: []}];

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

    $scope.saveNewPoll = function () {
      var newPoll = $scope.poll;
      $http.post('/api/polls/', {
        question: newPoll.question,
        dateCreated: Date.now(),
        author: Auth.getCurrentUser(),
        answers: newPoll.answers,
        hiddenFromPublic: false
      }).success(function(data) {
        $scope.poll._id = data._id;
      });
    };
  });
