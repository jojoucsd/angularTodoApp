var	Event = require('../models/event.js')
, 	Rsvp = require('../models/rsvp.js')
, 	User = require('../models/user.js')
, 	auth = require('./auth')

module.exports = function(app) {
	app.post('/api/event/:event_id/rsvp', auth.ensureAuthenticated, function (req, res){
		console.log("event rsvp passed back", req.body)
		User.findById(req.userId).exec(function(err, user){
			console.log('User found', user)
			Event.findById(req.params.event_id)
			.exec(function (err, event) {
				console.log('event id', event._id)
				console.log('event rsvp', event.rsvp)
				Rsvp.findById(event.rsvp).exec(function (err, rsvp){
					rsvp.users.unshift(user._id);
					rsvp.save()
					user.rsvps.unshift(rsvp._id);
					user.save()
					res.send(rsvp);
				})
			})		
		})
	})
}
