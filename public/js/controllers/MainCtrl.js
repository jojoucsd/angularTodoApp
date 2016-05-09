'use strict';

/* MAIN Controller */

angular.module('d2r-app')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$auth', '$http', 'Auth', '$route', function ($scope, $rootScope, $location, $auth, $http, Auth, $route) {

    // LOGIN/REGISTER
    $scope.user = {};

    $scope.isAuthenticated = function() {
      $http.get('/api/me').then(function (data) {
        if (!!data.data) {
          $scope.currentUser = data.data;
        } else {
          $auth.removeToken();
        }
      }, function (data) {
        $auth.removeToken();
        $location.path('/');
      });
    };

    $scope.isAuthenticated();

    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          console.log(response)
          $auth.setToken(response);
          $scope.isAuthenticated();
          $scope.user = {};
          $location.path('/profile');
        })
        .catch(function(response) {
          console.log(response)
        });
    };

    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $auth.setToken(response.data.token);
          $scope.isAuthenticated();
          $scope.user = {};
          $location.path('/profile')
        })
        .catch(function(response) {
          console.log(response)
        });
    };

    $scope.logout = function() {
      $auth.logout()
        .then(function() {
          $auth.removeToken();
          $scope.currentUser = null;
          $location.path('/')
        });
    };

    //Facebook, Google Login

    $scope.authenticate = function(provider) {
         $auth.authenticate(provider).then(function() {
           console.log('auth.cu is: ', Auth.currentUser);
           $scope.currentUser = Auth.currentUser();
           $scope.user = $scope.currentUser;
           console.log('navbar currentuser is: ', $scope.user);
           $('#login-modal').modal('hide');
           if($route.current.loadedTemplateUrl === 'templates/splash'){
            $location.path('/profile');
           }
           $location.path('/profile'); 
         });
       };
  }]);
