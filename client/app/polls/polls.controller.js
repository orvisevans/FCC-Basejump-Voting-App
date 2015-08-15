'use strict';

angular.module('workspaceApp')
  .controller('PollsCtrl', function ($scope, $http, $routeParams, Auth) {
    var userid = $routeParams.userid;
    var currentUser = Auth.getCurrentUser();
    var requestFilter = {};

    if (userid === currentUser) { requestFilter.showHiddenFromPublic = true; }
    $http.get('/api/polls/user/' + userid).success(function(data) {
      $scope.pollsByUser = data;
    });
  });
