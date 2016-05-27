'use strict';

/* APIs Controllers */

angular.module('d2r-app')
.controller('ApiCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
				$scope.position = position;
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;		
				var query = "lat=" + lat + "&lon=" + lon;
				var url = "http://api.openweathermap.org/data/2.5/";
				var unit = "&units=imperial";
				var key = "&appid=c55ec823be46f88fbcf55db70cc8e772";
				$http.jsonp(url+ "weather?" + query + unit + key + "&callback=JSON_CALLBACK").success(function(response){
					$scope.weather = response;
				});
			});
		});
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	_500px.api('/photos', { feature: 'popular', image_size: 6, sort: 'highest_rating', category: 8 }, function (response) {
		if (response.success) {
			$('#results').prepend("<img class='third-slide' id='splashimg' src='"+ response.data.photos[getRandomInt(0,20)].image_url + "'>");
		} else {
			console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
		}
	});	

	// Tab Form on Dash
	$scope.tabs = [{
		title: 'Notes',
		url: 'note.tpl.html'
	}, {
		title: 'Tasks',
		url: 'task.tpl.html'
	}, {
		title: 'Events',
		url: 'event.tpl.html'
	}];

	$scope.currentTab = 'note.tpl.html';

	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}

	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}

	$http.get('/api/me').success(function(data) {
		$scope.user = data;
	      // console.log('$scope', $scope.user)
	  });

}]);