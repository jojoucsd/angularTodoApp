'use strict';

/* Shows Detils of each post,notes,event Controllers */

angular.module('d2r-app')

.controller('PostShowCtrl', ['Comment','Post','Note', 'Event', 'Auth', '$scope', '$http', '$location', '$routeParams', function (Comment, Post, Note, Event, Auth, $scope, $http, $location, $routeParams){
  console.log('PostShowCtrl is in play');
  // $scope.sharedData = srvShareData.getData();
  $http.get('/api/me').success(function(data){
    $scope.user = data; 
    // console.log('$scope.user', $scope.user)
    // console.log('data', $scope.user.posts[0])
    var posts = $scope.user.posts
    var postIndex;
    for ( postIndex in posts){
      if (posts[postIndex]._id == $routeParams.id) {
        $scope.post = posts[postIndex]
        console.log('loop result', $scope.post)
        break
      }
    }
  })

  Post.get({ id: $routeParams.id}, function(post){
    $scope.post = post;
    $scope.comment = post.comments;
    // console.log('Post Get route', post)
    // console.log('comments', $scope.comment)
    
    $scope.createComment = function (post, user){
      console.log('comment', user , post)
      var config = {
        body: $scope.comment.body,
        user: user._id,
        post: post._id
      }

      console.log('config', config)
      $http.post('/api/post/'+ post._id +'/comments', config)
      .success(function(response){
        console.log('response', response)
        console.log('$scope post comments:', $scope.post.comments)
        $scope.post.comments.unshift(response);
      })
      .error(function(response){
        console.log('err', response)
      })
    }

  })
  
  // Note.get({ id: $routeParams.id}, function(note){
  //   console.log('note', note)
  //   $scope.note = note;
  // })

  // $scope.comment = {};

}])

.controller('EventShowCtrl', ['Comment','Post','Note', 'Event', 'Auth', '$scope', '$http', '$location', '$routeParams', function (Comment, Post, Note, Event, Auth, $scope, $http, $location, $routeParams){
  console.log('EventShowCtrl is in play');

  $http.get('/api/me').success(function(data){
    $scope.user = data; 
  })

  Event.get({ id: $routeParams.id}, function(event){
    // console.log('event', event)
    $scope.event = event; 
    $scope.comment = event.comments;
    $scope.rsvp = event.rsvp;

    $scope.createComment = function (event, user){
      var config = {
        body: $scope.comment.body,
        user: user._id,
        event: event._id
      }
      console.log('config', config)
      $http.post('/api/event/'+ event._id +'/comments', config)
      .success(function(response){
        console.log('response', response)
        $scope.event.comments.unshift(response);
      })
      .error(function(response){
        console.log('err', response)
      })
    }
  })

  $scope.createRsvp = function (event, user) {
    var config = {
      user: user._id,
      event: event._id
    }
    console.log('event config', config)
    $http.post('/api/event/'+ event._id + '/rsvp', config)
    .success(function(response){
      console.log('rsvp', response)
      console.log('rsvp users', response.users)
      // $scope.rsvp = response;
      $scope.rsvp.users.unshift(response.users[0])
    })
    .error(function(response){
      console.log('err', response)
    })
  }

}]);

