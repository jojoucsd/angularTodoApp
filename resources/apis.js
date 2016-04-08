var Post = require('../models/post.js')
	, User = require('../models/user.js')
  , auth = require('./auth')

module.exports = function(app) {
	app.post('/api/posts/search', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var post = new Post(req.body);
			var url = "http://api.herostats.io/heroes/" + req.body.hero
			request(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(body) // Show the HTML for the Google homepage. 
			  }
			  post.save(function(err, body) {
				user.posts.unshift(body._id);
				user.save();
				res.send(body);				
			});
			})
		})
	})
}
