var	Event = require('../models/event.js')
, 	Rsvp = require('../models/rsvp.js')
, 	User = require('../models/user.js')
, 	auth = require('./auth')

module.exports = function(app) {
	app.post('/api/rsvps', auth.ensureAuthenticated, function (req, res){
		// console.log("comment passed back", req.body)
		User.findById(req.userId).exec(function(err, user){
			// console.log('user found', user)		
			var rsvp = new Rsvp(req.body);
			rsvp.save(function(err, rsvp){
				user.rsvps.unshift(rsvp._id);
				user.save();
				res.send(rsvp);
			})
		})
	})
}