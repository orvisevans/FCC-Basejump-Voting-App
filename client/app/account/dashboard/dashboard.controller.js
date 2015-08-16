'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http, $location, Auth) {
    var requestFilter = {data: {showHiddenFromPublic: true}};

    Auth.getCurrentUserAsync(function(user) {
      $http.get('/api/polls/all-from/user/' + user._id, requestFilter).success(function(data) {
        $scope.myPolls = data;
      });
    });

    $scope.delete = function(poll) {
      if (confirm('Are you sure you want to delete this poll?')) {
        $http.delete('/api/polls/' + poll._id);
        $scope.myPolls = $scope.myPolls.filter(function(filterPoll) {
          return poll !== filterPoll
        });
      }
    };

    $scope.edit = function(poll) {
      $location.path('/edit-poll/' + poll._id);
    };

    $scope.toggleVisibility = function(poll) {
      $http.patch('/api/polls/' + poll._id, {hiddenFromPublic: !poll.hiddenFromPublic})
        .success(function () {
          poll.hiddenFromPublic = !poll.hiddenFromPublic;
        });
    };
  });
