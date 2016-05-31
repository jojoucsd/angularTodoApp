
'use strict';

/* Services */

angular.module('d2r-app.services', [])

.factory('Auth', ['$auth', function ($auth) {
  return {
    currentUser: function() {
      var user = $auth.getPayload();
      var currentUser = {
        _id: user.sub,
        email: user.email,
        picture: user.picture,
        displayName: user.displayName
      }
      return currentUser;
    }
  }
}])

.factory('Post', function ($window, $resource) {
  return $resource($window.location.origin + '/api/posts/:id', { id: '@id' }, {
    update: { method: 'PUT'} 
  });
})

.factory('Event', function ($window, $resource) {
  return $resource($window.location.origin + '/api/events/:id', { id: '@id' }, {
    update: { method: 'PUT'} 
  });
})

.factory('Note', function ($window, $resource) {
  return $resource($window.location.origin + '/api/notes/:id', { id: '@id' }, {
    update: { method: 'PUT'} 
  });
})

.factory('Comment', function ($window, $resource){
  return $resource($window.location.origin + '/api/comments/:id', { id: '@id'}, {
    update: { method: 'GET'}
  });
})

.service('srvShareData', function($window) {
  var KEY = 'App.SelectedValue';

  var addData = function(newObj) {
    var mydata = $window.sessionStorage.getItem(KEY);
    if (mydata) {
      mydata = JSON.parse(mydata);
    } else {
      mydata = [];
    }
    mydata.unshift(newObj);
    $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
  };

  var getData = function(){
    var mydata = $window.sessionStorage.getItem(KEY);
    if (mydata) {
      mydata = JSON.parse(mydata);
    }
    return mydata || [];
  };

  return {
    addData: addData,
    getData: getData
  };
});
