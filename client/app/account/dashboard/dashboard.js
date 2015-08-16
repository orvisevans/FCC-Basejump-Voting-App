'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'app/account/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  });
