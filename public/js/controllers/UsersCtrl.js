'use strict';

/* USER Controllers */

angular.module('d2r-app')
.controller('UsersCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
  
  var now = moment()
  $scope.day = now.format('YYYY-MM-DD');
  $scope.day = '';
  // console.log($scope.day);
  // console.log('UserCtrl', $scope.day)
  // var date = moment().format('YYYY-MM-DD');
  // console.log("new day", date);
  // $scope.day = date;
  // console.log('$scope.day', $scope.day._d)
  // $scope.select = function(pDate){
  //   // console.log('moment', day._d)
  //   var selectedDate = pDate;
  //   console.log(selectedDate);
  //   var pickedDate = moment(selectedDate).format("YYYY-MM-DD");
  //   // console.log(pickedDate);
  //   // return pickedDate;
  //   // var pickedDate = [];
  //   // pickedDate.push(moment(day).format("YYYY-MM-DD"));
  //   // console.log(pickedDate);
  // }


  $http.get('/api/me').success(function(data) {
    $scope.user = data;
      // console.log('$scope', $scope.user)
    });

  $scope.createPost = function(user) {
      // console.log(user);
      var config = {
        user: user._id,
        title: $scope.post.title,
        body: $scope.post.body
      };
      // console.log(config)
      // console.log('user', user._id)
      // console.log('scope.post', $scope.post)
      $http.post('/api/posts', config)
      .success(function(response) {
        console.log('response', response)
        $scope.user.posts.unshift(response);
      })
      .error(function(response) {
       console.log('err', response)
     })
    // $scope.post = {};
  }

  // $scope.editPost = function(post){
  //   // console.log('post', post)
  //   $scope.post = {
  //     user: post.user[0],
  //     _id: post._id,
  //     title: post.title,
  //     body: post.body
  //   }
  //   console.log('edit', $scope.post);
  // }

  $scope.updatePost = function(post){
    console.log('update', post)
    $http.put('/api/posts/'+ post._id, post)
    .success(function(response){
      console.log(response)
      post.editForm = false;
    })
    // console.log('edit', post);
  };

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
