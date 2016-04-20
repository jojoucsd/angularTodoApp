'use strict';

// Declare app level module which depends on filters, and services
angular.module('basic-auth', ['basic-auth.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'basic-auth.calendar'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'ProfileCtrl'
      });

      // $routeProvider.when('/profile', {
      //   templateUrl: 'templates/_calendarView.html',
      //   controller: 'CalendarCtrl'
      // });

      $routeProvider.when('/search', {
        templateUrl: 'templates/search',
        controller: 'SearchCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }]);

