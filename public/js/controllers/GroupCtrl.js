'use strict';

/* Shows Detils of each post,notes,event Controllers */

angular.module('d2r-app')

.controller('GroupCtrl', ['myService','$rootScope','Comment','Post','Event', 'Auth', '$scope', '$http', '$location', '$routeParams', function (myService, $rootScope, Comment, Post, Event, Auth, $scope, $http, $location, $routeParams){
  console.log('GroupCtrl is in play');

  // $scope.x = myService.getX();

  // $rootScope.$on('event:x', function() {
  //   $scope.x = myService.getX();
  // });

  // $scope.setX = function() {
  //   myService.setX($scope.x);
  // }
  // $scope.test = function(){
  //   console.log('test service')
  // }
  $scope.groups = {};
  $http.get('/api/me').success(function(data){
    $scope.user = data; 
    // console.log('data', $scope.user)
    $http.get('/api/groups').success(function(group){
      console.log('group is', group)
      $scope.groups =  group;
      $scope.x = group
      $scope.createGroup = function (user) {
        var config = {
          title: $scope.group.title,
          description: $scope.group.description,
          owner: user._id,
          users: user._id,
        }
        console.log('config', config)
        $http.post('/api/groups', config)
        .success(function(response){
          // console.log('response', response)
          $scope.groups.unshift(response)

          $scope.x = 
          $rootScope.$on('event:x', function() {
            $scope.x = myService.getX();
          });

          $scope.setX = function() {
            myService.setX($scope.x);
          }
        })
        .error(function(response){
          console.log('err', response)
        })
      }
    })
  })

  $scope.deleteGroup = function (group){
    // console.log('group', group)
    $http.delete('/api/groups/'+ group._id)
    .success(function(response){
      console.log(response)
      var index = $scope.groups.splice(index, 1)
    })
  }

  $scope.groupDetials = function (group) {
    $location.path('/group/'+ group._id);
  }
}])

.controller('GroupShowCtrl', ['Comment','Post','Event', 'Auth', '$scope', '$http', '$location', '$routeParams', function (Comment, Post, Event, Auth, $scope, $http, $location, $routeParams){
  console.log('GroupShowCtrl is in play');  

  $scope.userFound = false;
  // $scope.ownerFound = false;

  $http.get('/api/me').success(function(data){
    $scope.user = data; 
    $scope.group = data.groups
    // console.log('user', $scope.user)
    // console.log('group array', $scope.group)
    var groups = $scope.group;
    var found = false
    for ( var groupIndex in groups) {
      if (groups[groupIndex]._id == $routeParams.id){
        $scope.group = groups[groupIndex]
        console.log('loop result', $scope.group)
        found = true
        break
      }
    }
    if (found == false){
      // console.log('group not found')
      $http.get('/api/groups/'+ $routeParams.id)
      .success(function(response){
      // console.log('found', response)
      $scope.group = response;
      $scope.comment = response.comments
      // console.log('user', $scope.user._id)
      console.log('group', $scope.group)
      console.log('owner', $scope.group.owner)

      if ($scope.group.owner == $scope.user._id){
        $scope.Owner = true
        console.log('owner', $scope.Owner) 
      }else {
        $scope.Owner = false
        console.log('false', $scope.Owner)
      }

      var users = $scope.group.users
      for (var userIndex in users){
        console.log('userindex', users[userIndex])
        console.log('user ID', $scope.user._id)
        if (users[userIndex] == $scope.user._id){
          $scope.userFound = true
          console.log('userFound', $scope.userFound)
          break
        }
      }
    })
    }
  })

  $http.get('/api/groups/' + $routeParams.id)

  $scope.jointGroup = function (group, user) {
    var config = {
      users: user._id,
      groups: group._id,
      owner: group.owner
    }
    console.log('config', config)
    $http.post('/api/groups/'+ group._id, config)
    .success(function(response){
      $scope.group.users.unshift(response.users[0])
      // console.log(response)
    })
  }

  $scope.unjointGroup = function (group, user) {
    var config = {
      user : user._id,
      group : group._id
    }
    // console.log('config', config)
    $http.put('/api/groups/'+ group._id +'/unjoint', config)
    .success(function(response){
      console.log('response', response)
      var users = $scope.group.users;
      // console.log('group userArray', users)
      for ( var userIndex in users) {
        console.log('users', users[userIndex])
        if (users[userIndex] == user._id){
          $scope.group.users.splice(userIndex, 1)
          break
        }
      }
    })
  }

  $scope.groupComment = function (group, user) {

    var config = {
      user: user._id,
      group: group._id,
      body: group.comment,
    }

    $http.post('/api/groups/'+ group._id + '/comments', config)
    .success(function(response){
      console.log('response', response)
      $scope.comment.unshift(response)
    })
    .error(function(err){
      console.log('err:', err)
    })
  }

  $scope.deleteComment = function (comment) {
    console.log('comment', comment)
    $http.delete('/api/groups/'+ comment.group + '/comment/'+ comment._id, comment)
    .success(function(response){
      console.log('response delete', response)
      var index = $scope.comment.splice(index, 1)
    })
    .error(function(response){
      console.log(response)
    })
  }
}])

