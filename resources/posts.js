var Post = require('../models/post.js')
, User = require('../models/user.js')
, auth = require('./auth')

module.exports = function(app) {
	app.post('/api/posts', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var post = new Post(req.body);
			post.save(function(err, post) {
				user.posts.unshift(post._id);
				user.save();
				res.send(post);				
			});
		})
	})
	app.get('api/posts/:post_id', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function (err, user) {
			Post.findById(req.params.post_id, function(err, post) {
				if (err) { return res.status(404).send(err); }
				res.send(post); 
			});
		})
	})
	app.put('/api/posts/:post_id', auth.ensureAuthenticated, function(req,res){ 
		User.findById(req.userId).exec(function (err, user) {
			Post.findOneAndUpdate({ _id: req.params.post_id}, req.query.post, function (err, post) {
				if (err) { return res.send(err); }
				res.send(post);
			});
		})
	})

	  // delete one post by id
	  app.delete('/api/posts/:post_id', auth.ensureAuthenticated, function(req,res){   
	  	// User.findById(req.userId).exec(function (err, user) {
	  	// 	Post.remove({
	  	// 		_id :req.params.post_id
	  	// 	}, function(err, post){
	  	// 		if (err) { 
	  	// 			console.log(err)
	  	// 			return res.send(err);
	  	// 		}
	  	// 		console.log(post)
	  	// 		res.status(200).send('Success');
	  	// 	})
	  	// });
	  	Post.findByIdAndRemove(req.params.post_id, function (err, post) {
	  	  if (err) { return res.send(err); }
	  	  res.status(200).send('Success');
	  	});
	  });
	}
