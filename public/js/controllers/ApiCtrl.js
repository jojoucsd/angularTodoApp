'use strict';

/* APIs Controllers */

angular.module('d2r-app')
.controller('ApiCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
	// $scope.flashImg = [];
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	_500px.api('/photos', { feature: 'popular', image_size: 6, sort: 'highest_rating', category: 8 }, function (response) {
		if (response.success) {
		        // console.log(response.data.photos);
		        // $scope.flashImg = response.data.photos[getRandomInt(0,20)].image_url;
		        // $scope.flashImg.push(response.data.photos[getRandomInt(0,20)].image_url);
		        // console.log($scope.flashImg);
		        $('#results').prepend("<img class='third-slide' id='splashimg' src='"+ response.data.photos[getRandomInt(0,20)].image_url + "'>");
		        // $('#results').prepend("<img src='"+ response.data.photos[getRandomInt(0,20)].image_url + "'>");
		        // $('#results').css('background-image', 'url(' + response.data.photos[getRandomInt(0,20)].image_url + ')');
		    } else {
		    	console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
		    }
		});	
	// Tab Form on Dash
	  $scope.tabs = [{
	              title: 'Notes',
	              url: 'one.tpl.html'
	          }, {
	              title: 'Tasks',
	              url: 'two.tpl.html'
	          }, {
	              title: 'Events',
	              url: 'three.tpl.html'
	      }];

	      $scope.currentTab = 'one.tpl.html';

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