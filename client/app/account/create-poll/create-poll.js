'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create-poll', {
        templateUrl: 'app/account/create-poll/create-poll.html',
        controller: 'CreatePollCtrl'
      });
  });
