'use strict';

/* USER Controllers */

angular.module('d2r-app')
.controller('UsersCtrl', ['$scope', '$http', '$auth', 'Auth', '$location', '$window', 'srvShareData', '$routeParams', function($scope, $http, $auth, Auth, $location, $window, srvShareData, $routeParams) {
  $http.get('/api/me').success(function(data){
    $scope.user = data; 
  })

  $scope.post = {};
  $scope.note = {};

  //Calendar 
  var now = moment()
  $scope.day = now.format('YYYY-MM-DD');

  //Post Filter
  $scope.postFilter = function(day, user){
    var filterDate = moment(day);
    var filterRange = moment(filterDate).add(1,'day');
    var created_at = { 
      user: user._id,
      startDate: filterDate,
      finishDate: filterRange
    };
    $http.post('/api/posts/filter', created_at )
    .success(function(response) {
      console.log('filter result:', response)
      $scope.filters = response ;
      var filterResult = false;
    })
    $scope.filter = {};
  }
  
  //Note Filter
  $scope.noteFilter = function(day, user){
    var filterDate = moment(day);
    var filterRange = moment(filterDate).add(1,'day');
    var created_at = { 
      user: user._id,
      startDate: filterDate,
      finishDate: filterRange
    };
    // console.log(created_at);
    $http.post('/api/notes/filter', created_at )
    .success(function(response) {
      console.log('filter result:', response)
      $scope.filters = response ;
      var filterResult = false;
    });
    $scope.filter = {};
  }

//Post Section
$scope.createPost = function(user) {
      // console.log(user);
      var config = {
        user: user._id,
        title: $scope.post.title,
        body: $scope.post.body
      };
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

  // $scope.dataToShare = [];
  // $scope.postShow = function(post) {
  //   $http.get('/api/posts/'+ post._id).success(function(response){
  //     // console.log('return', response)  

  //     $scope.dataToShare = response;
  //    srvShareData.addData($scope.dataToShare);
  //     $window.location.href = '/tasks/'+post._id + '/comments';
  //   })
  // }

  $scope.postShow = function(post) {
    // console.log(post._id)
    $location.path('/tasks/'+ post._id + '/comments');
    // console.log('First', post)
  }

  $scope.noteShow = function(note){
    $location.path('/tasks/'+ note._id + '/comments');
  }
  // Note Section
  $scope.createNote = function(user) {
      // console.log(user);
      var config = {
        body: $scope.note.body,
        user: user._id
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
  }])

.controller('CommentsCtrl', ['Post','Note', 'Event', 'Auth', '$scope', '$http', '$location', '$routeParams', 'srvShareData', function (Post, Note, Event, Auth, $scope, $http, $location, $routeParams, srvShareData){
  console.log('CommentsCtrl is in play');
  // $scope.sharedData = srvShareData.getData();
  Post.get({ id: $routeParams.id}, function(post){
    console.log('post', post);
    $scope.post = post;
  })

  Note.get({ id: $routeParams.id}, function(note){
    console.log('note', note)
    $scope.note = note;
  })

  Event.get({ id: $routeParams.id}, function(event){
    console.log('event', event)
    $scope.event = event; 
  })

  // $scope.createComment = function (post){
  //   var config = {
    
  //   }
  //   Post.get( { id: post._id}, function (post) {

  //   })
  // }
}]);





