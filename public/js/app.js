'use strict';

// Declare app level module which depends on filters, and services
angular.module('d2r-app', ['d2r-app.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'd2r-app.calendar',
                              'ngMdIcons',
                              'google.places',
                              'ngMap'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash',
        controller: 'ApiCtrl'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'UsersCtrl'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'ApiCtrl'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'EventsCtrl'
      });

      $routeProvider.when('/posts', {
        templateUrl: 'templates/tasks',
        controller: 'UsersCtrl'
      });
     
      $routeProvider.when('/events', {
        templateUrl: 'templates/events',
        controller: 'EventsCtrl'
      })

      $routeProvider.when('/notes', {
        templateUrl: 'templates/notes',
        controller: 'UsersCtrl'
      })
      
      // $routeProvider.when('/navbar', {
      //   templateUrl: 'templates/navbar',
      //   controller: 'UsersCtrl'
      // });

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }])

    .config(function($authProvider, $windowProvider) {

         var $window = $windowProvider.$get();
         if ($window.location.host == 'localhost:1337') {
           console.log('development app');
           $authProvider.facebook({        
             clientId: '1709349286019442'
           });
           $authProvider.google({
            clientId: '904208969176-6cdnvqnealq1ho63lddcjf8a797aqq0v.apps.googleusercontent.com'
           });
         } else {
           console.log('production app');
           $authProvider.facebook({        
             clientId: '1709349286019442'
           });
           $authProvider.google({
            clientId: '904208969176-6cdnvqnealq1ho63lddcjf8a797aqq0v.apps.googleusercontent.com'
           });
         }
       });

