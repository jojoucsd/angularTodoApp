'use strict';

/* APIs Controllers */

angular.module('d2r-app')
.controller('ApiCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {

	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	_500px.api('/photos', { feature: 'popular', image_size: 6, sort: 'highest_rating', category: 8 }, function (response) {
		if (response.success) {
		        console.log(response.data.photos);
		        $('#results').prepend("<img class='third-slide' id='splashimg' src='"+ response.data.photos[getRandomInt(0,20)].image_url + "'" + "alt='Third slide'>");
		        // $('#results').prepend("<img src='"+ response.data.photos[getRandomInt(0,20)].image_url + "'>");
		        // $('#results').css('background-image', 'url(' + response.data.photos[getRandomInt(0,20)].image_url + ')');
		    } else {
		        console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
		    }
	});	
  // $http.get('/api/me').success(function(data){
  // $scope.user = data; 
  // })
  
}]);