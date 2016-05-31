var Post = require('../models/post.js')
, Note = require('../models/note.js')
, Event = require('../models/event.js')
, Comment = require('../models/comment.js')
, User = require('../models/user.js')
, auth = require('./auth')

module.exports = function(app) {
	app.post('/api/post/:post_id/comments', auth.ensureAuthenticated, function (req, res){
		// console.log("comment passed back", req.body)
		// console.log('post', req.body.post)
		User.findById(req.userId).exec(function(err, user){
			Post.findById(req.body.post)
			.populate('comments')
			.populate('user')
			.exec(function(err,post){
				console.log('commentor email in post: ', post.user.email)
				var comment = new Comment(req.body);
				comment.save(function(err, comment){
					post.comments.unshift(comment._id);
					post.save();
					Comment.findById(comment._id)
					.populate('user')
					.exec(function (err, data){
					console.log('Data', data.user)
					res.send(data);
					})
				})
			})	
		})
	})

	app.post('/api/event/:event_id/comments', auth.ensureAuthenticated, function (req, res){
		User.findById(req.userId).exec(function(err, user){
			Event.findById(req.params.event_id)
			.populate('comments')
			.exec(function (err, event){
				var comment = new Comment(req.body);
				comment.save(function (err, comment){
					event.comments.unshift(comment._id);
					event.save();
					Comment.findById(comment._id)
					.populate('user')
					.exec(function (err, data) {
						res.send(data);
					})
				})
			})
		})
	})
}