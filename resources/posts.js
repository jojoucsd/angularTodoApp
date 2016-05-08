var Post = require('../models/post.js')
, User = require('../models/user.js')
, auth = require('./auth')

module.exports = function(app) {
	app.post('/api/posts', auth.ensureAuthenticated, function (req,res) {
		console.log(req.body)
		User.findById(req.userId).exec(function(err, user) {
			var post = new Post(req.body);
			// console.log(post);
			post.save(function(err, post) {
				user.posts.unshift(post._id);
				// user.unshift(user._id);
				user.save();
				res.send(post);				
			});
		})
	})
	app.post('/api/posts/:date', function(req,res){
		console.log(req);
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
		console.log('putroute', req.body);
		console.log('postId', req.params.post_id);
		Post.findOneAndUpdate({ _id: req.params.post_id}, req.body , function (err, post) {
			// console.log("editRoute", post);
			if (err) { return res.send(err); }
			// console.log('backend',post);
			res.send(post);
		});
	})

	  // delete one post by id
	  app.delete('/api/posts/:post_id', auth.ensureAuthenticated, function(req,res) {
	  	// console.log(req.body); 
	  	// User.findById(req.user).exec(function (err, user) {
	  		Post.remove({
	  			_id : req.params.post_id
	  		}, function(err, post){
	  			if (err) { 
	  				console.log(err)
	  				return res.send(err);
	  			}
	  			console.log(req.query.body)
	  			User.findOneAndUpdate(
	  				{ posts: req.params.post_id},
	  				{ "$pull": {"posts": req.params.post_id}},
	  				function (err, post){
	  					if(err) {return res.send(err);}
	  					else{
	  						console.log("OBjectID", post);
	  						res.status(200).send('Find User and deleted Post');
	  					}  					
	  				})
	  		})
	  	});
	}
