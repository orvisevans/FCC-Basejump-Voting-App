'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit-poll/:pollid', {
        templateUrl: 'app/account/edit-poll/edit-poll.html',
        controller: 'EditPollCtrl'
      });
  });
