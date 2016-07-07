
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
        displayName: user.displayName,
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
    update: { method: 'PUT'},
  });
})

.factory('Group', function ($window, $resource){
  return $resource($window.location.origin + '/api/groups/:id', { id: '@id'}), {
    update: { method: 'PUT'},
  }
})

.factory('navGroup', function(){
  return {
    groups: [] 
  };    
})

.factory('myService', function($rootScope) {
  var x = [];
  return {
    getX: function () {
      return x;
    },
    setX: function(val) {
     x = val;
     $rootScope.$broadcast('event:x');
   }
 }
})

.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);

// .service('srvShareData', function($window) {
//   var KEY = 'App.SelectedValue';

//   var addData = function(newObj) {
//     var mydata = $window.sessionStorage.getItem(KEY);
//     if (mydata) {
//       mydata = JSON.parse(mydata);
//     } else {
//       mydata = [];
//     }
//     mydata.unshift(newObj);
//     $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
//   };

//   var getData = function(){
//     var mydata = $window.sessionStorage.getItem(KEY);
//     if (mydata) {
//       mydata = JSON.parse(mydata);
//     }
//     return mydata || [];
//   };

//   return {
//     addData: addData,
//     getData: getData
//   };
// })

// .service('APIService', function ($http) {
//     return {
//         getWork: function() {
//             return $.ajax({
//                 url: "https://api.fantasydata.net/nba/v2/JSON/News",
//                 beforeSend: function (xhrObj) {
//                     // Request headers
//                     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "45a3f3bf69404c5ea7edbd03c2f7e128");
//                 },
//                 type: "JSON"             
//             })
//         .done(function (data) {
//             alert("success");
//         })
//         .fail(function () {
//             alert("error");
//         });
//     }
//   }
// });

