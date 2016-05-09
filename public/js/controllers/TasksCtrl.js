'use strict'

angular.module('d2r-app')
.controller('TasksCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
	$http.get('/api/me').success(function(data){
	$scope.user = data;	
	})
	
}]);