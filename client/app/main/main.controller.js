'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomePolls = [];

    $http.get('/api/polls').success(function(awesomePolls) {
      $scope.awesomePolls = awesomePolls;
    });
  });
