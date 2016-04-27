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

      $routeProvider.when('/search', {
        templateUrl: 'templates/search',
        controller: 'SearchCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/'});

    }])

    .config(function($authProvider, $windowProvider) {

         var $window = $windowProvider.$get();
         if ($window.location.host == 'localhost:1337') {
           console.log('development app');
           $authProvider.facebook({        
             clientId: '1709349286019442'
           });

         } else {
           console.log('production app');
           $authProvider.facebook({        
             clientId: '1709349286019442'
           });
         }
       });

