var	Event = require('../models/event.js')
, 	Rsvp = require('../models/rsvp.js')
,	Post = require('../models/post.js')
,	Comment = require('../models/comment.js')
, 	User = require('../models/user.js')
, 	auth = require('./auth')
, 	Group = require('../models/group.js')

module.exports = function(app) {
	app.get('/api/groups/:group_id', auth.ensureAuthenticated, function(req, res){
		console.log('group found')
		Group.findById(req.params.group_id)
		.populate('comments')
		.exec(function(err, group){
			if(err) { return res.status(404).send(err);}
			// console.log('group', group)
			res.send(group)
		})
	})

	app.get('/api/groups', auth.ensureAuthenticated, function(req, res){
		// console.log('user Id', req.userId)
		Group.find({users: req.userId}).exec(function (err, groups){
			// console.log('user has groups', groups)
			res.send(groups)
		})
	})
	app.post('/api/groups', auth.ensureAuthenticated, function (req, res){
		console.log('backend', req.body)
		var group = new Group(req.body);
		group.save(function(err, group){
			res.send(group)
		})
	})

	app.post('/api/groups/:id',auth.ensureAuthenticated, function(req, res){
		console.log(req.body.groups)
		Group.findById(req.body.groups).exec(function(err, group){
			// console.log('group found', group)
			group.users.unshift(req.body.users)
			group.save();
			res.send(group)
		})
	})

	app.put('/api/groups/:id/unjoint', auth.ensureAuthenticated, function(req, res){
		console.log('we made to here')
		Group.findOneAndUpdate(
			{ "_id": req.body.group},
			{ "$pull": {"users": req.body.user}},
			function (err, group){
				if (err) {return res.send(err);}
				else {
					res.status(200).send('Finished Delete')
				}
			})
	})

	app.post('/api/groups/:id/comments', auth.ensureAuthenticated, function(req, res){
		console.log("group comments", req.body)	
		Group.findById(req.body.group).exec(function(err, group){
			console.log('group comment found', group)
			var comment = new Comment(req.body);
			comment.save(function (err, comment){
				console.log('comment saved', comment)
				group.comments.unshift(comment._id)
				group.save()
				res.send(comment)
			})
		})
	})

	app.delete('/api/groups/:group_id', auth.ensureAuthenticated, function(req, res){
		console.log("delete made to here")
		Group.remove({_id: req.params.group_id}, function (err, group){
			if(err) {return res.send(err)}
				Comment.remove({group: req.params.group_id})
			.exec(function (err, result){
				if (err) { return res.send(err)}
					res.status(200).send('Group Deleted')
			})
		})
	})

	app.delete('/api/groups/:group_id/comment/:comment_id', auth.ensureAuthenticated, function (req, res){
		console.log('delete made to here', req.body);
		Comment.remove({ _id: req.params.comment_id}, function (err, comment){
			if(err){
				console.log(err)
				return res.send(err);
			}
			Group.findOneAndUpdate(
				{ "_id": req.body.group},
				{ "$pull": {"comments": req.params.comment_id}},
				function (err, group){
					if (err) {return res.send(err);}
					else {
						console.log("Object Group Delete", group) 
						res.status(200).send('Finished Delete')
					}
				})
		})
	})
}
