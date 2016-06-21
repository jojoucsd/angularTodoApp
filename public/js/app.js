'use strict';

// Declare app level module which depends on filters, and services
angular.module('d2r-app', ['d2r-app.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'd2r-app.calendar',
                              'ngMdIcons',
                              'google.places',
                              'ngMap',
                              'toastr',])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'ApiCtrl'
      })

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

      $routeProvider.when('/tasks', {
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
      
      $routeProvider.when('/task/:id/comments', {
        templateUrl: 'templates/task-show',
        controller: 'PostShowCtrl'
      })

      $routeProvider.when('/event/:id/comments', {
        templateUrl: 'templates/event-show',
        controller: 'EventShowCtrl'
      })

      $routeProvider.when('/groups', {
        templateUrl: 'templates/groups',
        controller: 'GroupCtrl'
      })

      $routeProvider.when('/group/:id', {
        templateUrl: 'templates/group-show',
        controller: 'GroupShowCtrl'
      })
      
      // $routerProvider.when('/event/:id/rsvps', {
      //   templateUrl: 'templates/event-rsvp',
      //   controller: 'EventShowCtrl'
      // })

      // $routeProvider.when('/event/:id/rsvp/:id', {
      //   templateUrl: 'templates/rsvp-detial',
      //   controller: 'EventShowCtrl'
      // })

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

