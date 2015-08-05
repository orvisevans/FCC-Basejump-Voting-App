'use strict';

angular.module('workspaceApp')
  .controller('PollsCtrl', function ($scope, $http, $routeParams) {
    var userid = $routeParams.userid;
    $scope.pollsByUser;
    $http.get('/api/polls/user/' + userid).success(function(data) {
      $scope.pollsByUser = data;
    });
  });
