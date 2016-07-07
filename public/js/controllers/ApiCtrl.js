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
				var url = "//api.openweathermap.org/data/2.5/";
				var unit = "&units=imperial";
				var key = "&appid=325eb4a6e7af80ea40b557e093f01b04";
				$http.jsonp(url+ "weather?" + query + unit + key + "&callback=JSON_CALLBACK").success(function(response){
					$scope.weather = response;
				});
			});
		});
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	// _500px.api('/photos', { feature: 'popular', image_size: 6, sort: 'highest_rating', category: 8 }, function (response) {
	// 	if (response.success) {
	// 		$('#results').prepend("<img class='third-slide' id='splashimg' src='"+ response.data.photos[getRandomInt(0,20)].image_url + "'>");
	// 	} else {
	// 		console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
	// 	}
	// });	

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

	console.log('API CALL NYtimes!')

	var url1 = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=b9ccbfb3e60d48ce9c81dcc40406ab84&callback=JSON_CALLBACK'
	var url2 = 'https://api.nytimes.com/svc/topstories/v2/home.jsonp?api-key=b9ccbfb3e60d48ce9c81dcc40406ab84&responce-format=.jsonp&callback=homeTopStoriesCallback'
	var url3 = 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty&callback=JSON_CALLBACK'		
	var url4 = 'https://api.nytimes.com/svc/topstories/v2/home.jsonp?api-key=b9ccbfb3e60d48ce9c81dcc40406ab84&callback=angular.callbacks._1(json_response)'
	var url5 = 'https://api.nytimes.com/svc/news/v3/content/all/all.jsonp?api-key=ccb58d5412a54799e82ad086c0387669:5:74719242&responce-format=.jsonp&callback=JSON_CALLBACK'

	$http({
		method: 'JSONP',
		url: url5 })
	.success(function(data){
		$scope.data = data
		// console.log('data', data.results)
		$scope.news = data.results
	})
	.error(function(err){
		console.log('err',err)
	})

	$scope.types = ['hot'];		  		
	$scope.subredit="worldnews";			
	$scope.type="new";

	var url="https://api.reddit.com/r/"+$scope.subredit+"/?jsonp=JSON_CALLBACK";
	console.log("we maded here")
	$http.jsonp(url).success(function(data) {
		$scope.elements = [];
		var dataset = data.data.children;
		for (var i=0; i<dataset.length; i++ ){
					$scope.elements.push(dataset[i].data); // response data 
					// console.log('reddit', $scope.elements)
				}				

			});

	// $scope.NBA= APIService.getWork()

	// console.log('NBA', $scope.NBA)
	// $scope.warm = function() {			
	// 	var url="http://api.reddit.com/r/"+$scope.subredit+"/"+$scope.type+"?jsonp=JSON_CALLBACK";
	// 	$http.jsonp(url).success(function(data) {
	// 		$scope.elements = [];
	// 		var dataset = data.data.children;
	// 		for (var i=0;i<dataset.length;i++){
	// 					$scope.elements.push(dataset[i].data); // response data 
	// 					console.log('reddit', $scope.elements)
	// 				}				

	// 			});
	// };
	// var key = '2b9f1a534dd54c359e101c94bc7547aa'
	// $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = key
	var headers = {'Ocp-Apim-Subscription-Key': '2b9f1a534dd54c359e101c94bc7547aa'}
	// $scope.nba = function() {
	// 	var url = 'https://api.fantasydata.net/nba/v2/JSON/News?callback=JSON_CALLBACK'
	// 	// $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = '2b9f1a534dd54c359e101c94bc7547aa';
	// 	$http({
	// 		method: 'JSONP',
	// 		url: url,
	// 		headers: headers
	// 	})
	// 	.success(function(data){
	// 		console.log('data', data)
	// 	})
	// 	.error(function(err){
	// 		console.log('err', err)
	// 	})
	// }
}]);

