'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/polls/:userid', {
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl'
      });
  });
