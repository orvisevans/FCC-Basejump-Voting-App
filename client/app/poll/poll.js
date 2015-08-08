'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/:pollid', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      });
  });
