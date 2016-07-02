var Event = require('../models/event.js')
, Rsvp = require('../models/rsvp.js')
, User = require('../models/user.js')
, auth = require('./auth')

module.exports = function(app) {

	
	// get all events
	app.get('/api/events', auth.ensureAuthenticated, function(req, res) {
		console.log("HIT API")
		User.findById(req.userId).exec(function(err, user) {
			// use mongoose to get all posts in the database
			User.find(function(err, events) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(events); // return all posts in JSON format
			});
		});
	});

	app.get('/api/events/:event_id', auth.ensureAuthenticated, function (req,res) { 
		Event.findById(req.params.event_id)
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
				model: 'User'
			}
		})
		.populate('user')
		.populate('rsvp')
		.exec(function(err, event) {
			console.log('backend', event)
			if (err) { return res.status(404).send(err); }
			res.send(event);
		});
	})

	// filter events
	app.post('/api/events/filter', auth.ensureAuthenticated, function (req,res){
		console.log('backend', req.body)
		User.findById(req.body.user).exec(function (err, user){
			console.log('user', user)
			Event.find({ created_at: {$gte: req.body.startDate,
				$lte: req.body.finishDate},
				user: req.body.user
			}, function(err, event){
				if (err){
					console.log(err)
					return res.send(err);
				}
				console.log('filter result', event)
				res.send(event);
			})
		})
	})

	app.post('/api/events', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			if (err)
				res.send(err);
			var event = new Event(req.body);
			event.save(function(err, event) {
				if (err) 
					res.send(err);
				user.events.unshift(event._id);
				user.save();
				console.log('event body', event._id);
				var rsvp = new Rsvp();
				rsvp.event = event._id;
				rsvp.save(function(err, rsvp){
					// user.events.unshift(event._id);
					event.rsvp = rsvp._id;
					// user.save();
					event.save();
					// res.send(rsvp);
				})
				res.send(event);				
			});
		});
	});

	app.put('/api/events/:event_id', auth.ensureAuthenticated, function(req,res){ 
		console.log('putroute', req.body);
		console.log('eventId', req.params.event_id);
		Event.findOneAndUpdate({ _id: req.params.event_id}, req.body , function (err, event) {
			// console.log("editRoute", post);
			if (err) { return res.send(err); }
			console.log('backend',event);
			res.send(event);
		});
	})


	app.delete('/api/events/:event_id', function(req, res) {
		Event.findByIdAndRemove({
			_id : req.params.event_id
		}, function(err, event) {
			if (err)
				res.send(err);

			// find User and pull event from events array in User
			User.findOneAndUpdate(
				{ events: req.params.event_id},
				{ "$pull": {"events": req.params.event_id}},
				function (err, event){
					if(err) {
						res.send(err);
					} else {
						console.log("OBjectID", event);

						// get and return all the events after you create another
						res.status(200).send('Find user and deleted');
					}
					
				});
		});
	});


};