'use strict'

angular.module('d2r-app')
.controller('EventsCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
	$http.get('/api/me').success(function(data){
	$scope.user = data;	
	})

	$scope.event = {};

	$scope.createEvent = function(user) {
		var config = {
			title : $scope.event.title,
			description  : $scope.event.description,
			location : $scope.event.location,
			date : $scope.event.date,
			user: user._id,
		}
		$http.post('/api/events', config)
		.success(function(response){
			$scope.user.events.unshift(response);
		})
		.error(function(response){
			console.log('err', response);
		})
	}

	$scope.updateEvent = function(event){
	  console.log('update', event)
	  $http.put('/api/events/'+ event._id, event)
	  .success(function(response){
	    console.log(response)
	    event.editForm = false;
	  })
	  // console.log('edit', post);
	};

	$scope.deleteEvent = function(event) {
	  console.log(event);
	  $http.delete('/api/events/' + event._id)
	  .success(function(response){
	      // console.log(response)
	      var index= $scope.user.events.indexOf(event)
	      $scope.user.events.splice(index, 1);
	    })
	  .error(function(response){
	    console.log(response)
	  });
	};
}]);