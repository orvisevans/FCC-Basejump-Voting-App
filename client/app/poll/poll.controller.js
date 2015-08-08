'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $http, $routeParams) {
    var pollId = $routeParams.pollid;
    $scope.poll = "loading poll";
    $http.get('/api/polls/' + pollId).success(function(data) {
      $scope.poll = data;
    });
  });
