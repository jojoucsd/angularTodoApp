'use strict';

// Declare app level module which depends on filters, and services
angular.module('basic-auth', ['basic-auth.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'basic-auth.calendar',
                              'ngMdIcons',
                              'google.places'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard',
        controller: 'UsersCtrl'
      });

      $routeProvider.when('/posts', {
        templateUrl: 'templates/tasks',
        controller: 'UsersCtrl'
      });
     
      $routeProvider.when('/events', {
        templateUrl: 'templates/events',
        controller: 'UsersCtrl'
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

