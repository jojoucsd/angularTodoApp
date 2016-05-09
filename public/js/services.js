
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
  });