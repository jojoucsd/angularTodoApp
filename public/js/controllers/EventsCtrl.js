'use strict'

angular.module('d2r-app')
.controller('EventsCtrl', ['$scope', '$http', '$auth', 'Auth', '$location', function($scope, $http, $auth, Auth, $location) {
	$http.get('/api/me').success(function(data){
	$scope.user = data;	
	})

	$scope.event = {};

	//Event Map Tabs

	$scope.tabs = [{
				title: 'Event',
				url: 'event.tpl.html'
				},{
				title: 'Map',
				url: 'map.tpl.html'
	}];

	$scope.currentTab = 'map.tpl.html';

	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	};

	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	};

	//Event Filter
	$scope.eventFilter = function(day, user){
	  var filterDate = moment(day);
	  var filterRange = moment(filterDate).add(1,'day');
	  var created_at = { 
	    user: user._id,
	    startDate: filterDate,
	    finishDate: filterRange
	  };
	  $http.post('/api/events/filter', created_at )
	  .success(function(response) {
	    // console.log('filter result:', response)
	    $scope.filters = response ;
	    var filterResult = false;
	  })
	  $scope.filter = {};
	}

	//Create, Edit and Delete
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
	$scope.eventShow = function(event){
	  $location.path('/tasks/'+ event._id + '/comments');
	}
}]);