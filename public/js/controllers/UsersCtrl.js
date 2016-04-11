'use strict';

/* USER Controllers */

angular.module('basic-auth')
.controller('ProfileCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
  });

    $scope.createPost = function() {
        // console.log('post', post );
    	$http.post('/api/posts', $scope.post)
        // console.log('$scope.post', $scope.post)
      .success(function(response) {
        console.log('response', response)
         $scope.user.posts.unshift(response);
     })
      .error(function(response) {
         console.log('err', response)

     })
    // $scope.post = {};
  }
  $scope.deletePost = function(post) {
    console.log(post);
    $http.delete('/api/posts/' + post._id)
    .success(function(response){
        // console.log(response)
        var index= $scope.user.posts.indexOf(post)
        $scope.user.posts.splice(index, 1);
    })
    .error(function(response){
        console.log(response)
    });
};
}]);