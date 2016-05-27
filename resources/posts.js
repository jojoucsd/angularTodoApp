var Post = require('../models/post.js')
, Note = require('../models/note.js')
, User = require('../models/user.js')
, auth = require('./auth')

module.exports = function(app) {
	app.post('/api/posts', auth.ensureAuthenticated, function (req,res) {
		// console.log(req.body)
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
	//post filter
	app.post('/api/posts/filter', auth.ensureAuthenticated, function (req,res){
		console.log('backend', req.body)
		User.findById(req.body.user).exec(function (err, user){
			console.log('user', user)
			Post.find({ created_at: {$gte: req.body.startDate,
				$lte: req.body.finishDate},
				user: req.body.user
			}, function(err, post){
				if (err){
					console.log(err)
					return res.send(err);
				}
				console.log('filter result', post)
				res.send(post);
			})
		})
	})

	app.get('/api/posts/:post_id', auth.ensureAuthenticated, function (req,res) { 
		Post.findById(req.params.post_id, function(err, post) {
			console.log('backend', post)
			if (err) { return res.status(404).send(err); }
			res.send(post);
		});
	})
	
	app.put('/api/posts/:post_id', auth.ensureAuthenticated, function(req,res){ 
		console.log('putroute', req.body);
		console.log('postId', req.params.post_id);
		Post.findOneAndUpdate({ _id: req.params.post_id}, req.body , function (err, post) {
			if (err) { return res.send(err); }
			res.send(post);
		});
	})

	  // delete one post by id
	  app.delete('/api/posts/:post_id', auth.ensureAuthenticated, function(req,res) {
	  	// console.log(req.body); 
	  	// User.findById(req.user).exec(function (err, user) {
	  		Post.remove({ _id : req.params.post_id}, function(err, post){
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
	  //notes secion, filter
	  app.post('/api/notes/filter', auth.ensureAuthenticated, function (req,res){
	  	console.log('backend', req.body)
	  	User.findById(req.body.user).exec(function (err, user){
	  		console.log('user', user)
	  		Note.find({ created_at: {$gte: req.body.startDate,
	  			$lte: req.body.finishDate},
	  			user: req.body.user
	  		}, function(err, note){
	  			if (err){
	  				console.log(err)
	  				return res.send(err);
	  			}
	  			console.log('filter result', note)
	  			res.send(note);
	  		})
	  	})
	  })

	  app.get('/api/notes/:note_id', auth.ensureAuthenticated, function (req,res) { 
	  	Note.findById(req.params.note_id, function(err, note) {
	  		console.log('backend', note)
	  		if (err) { return res.status(404).send(err); }
	  		res.send(note);
	  	});
	  })
	  
	  app.post('/api/notes', auth.ensureAuthenticated, function (req,res) {
	  	console.log(req.body)
	  	User.findById(req.userId).exec(function(err, user) {
	  		var note = new Note(req.body);
			// console.log(post);
			note.save(function(err, post) {
				user.notes.unshift(note._id);
				// user.unshift(user._id);
				user.save();
				res.send(note);				
			});
		})
	  });

	  app.put('/api/notes/:note_id', auth.ensureAuthenticated, function(req,res){ 
	  	Note.findOneAndUpdate({ _id: req.params.note_id}, req.body , function (err, note) {
	  		if (err) { return res.send(err); }
	  		res.send(note);
	  	});
	  })

	  app.delete('/api/notes/:note_id', auth.ensureAuthenticated, function(req,res) {
	  	Note.remove({ _id : req.params.note_id}, function(err, note){
	  		if (err) { 
	  			console.log(err)
	  			return res.send(err);
	  		}
	  		console.log(req.query.body)
	  		User.findOneAndUpdate(
	  			{ notes: req.params.note_id},
	  			{ "$pull": {"notes": req.params.note_id}},
	  			function (err, note){
	  				if(err) {return res.send(err);}
	  				else{
	  					console.log("OBjectID", note);
	  					res.status(200).send('Find User and deleted Note');
	  				}  					
	  			})
	  	})
	  });
	}
