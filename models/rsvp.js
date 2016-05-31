var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var RsvpSchema = Schema({
		created_at : { type: Date, default: Date.now() },
		updated_at : { type: Date },
		event: [{ type: Schema.ObjectId, ref: 'Event'}],
		user: [{ type: Schema.ObjectId, ref: 'User'}],
	})

// MIDDLEWARE
RsvpSchema.pre('save', function(next){
	//set create and update
	now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
});

var Rsvp = mongoose.model('Rsvp', RsvpSchema);

module.exports= Rsvp;