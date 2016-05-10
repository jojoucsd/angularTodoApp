'use strict';

/* USER Controllers */

angular.module('d2r-app')
.controller('UsersCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
  $http.get('/api/me').success(function(data){
  $scope.user = data; 
  })
  //Calendar 
  var now = moment()
  $scope.day = now.format('YYYY-MM-DD');
  $scope.post = {};
  $scope.note = {};
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
  
//Post Section
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

  $scope.updatePost = function(post){
    console.log('update', post)
    $http.put('/api/posts/'+ post._id, post)
    .success(function(response){
      console.log(response)
      post.editForm = false;
    })
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
  // Note Section
  $scope.createNote = function(user) {
      // console.log(user);
      var config = {
        body: $scope.note.body
      };
      $http.post('/api/notes', config)
      .success(function(response) {
        console.log('response', response)
        $scope.user.notes.unshift(response);
      })
      .error(function(response) {
       console.log('err', response)
     })
    }
  $scope.updateNote = function(note){
    $http.put('/api/notes/'+ note._id, note)
    .success(function(response){
      note.editForm = false;
    })
  };
  $scope.deleteNote = function(note) {
    $http.delete('/api/notes/' + note._id)
    .success(function(response){
        var index= $scope.user.notes.indexOf(note)
        $scope.user.notes.splice(index, 1);
      })
    .error(function(response){
      console.log(response)
    });
  };
}]);
