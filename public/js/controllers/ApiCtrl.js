'use strict';

/* APIs Controllers */

angular.module('basic-auth')
  .controller('ApiCtrl', function($http, $window, $scope) {
    $scope.searchHero = function() {
      console.log("sanity check");
      var hero = { hero: $scope.term };
      $http.post($window.location.origin + '/api/heroes/search', hero)
        .success(function(response) {
          $scope.hero = response
          console.log(response);
        })
        .error(function(response) {
          console.log(response)
        })
    }
  }]);