var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var GroupSchema = Schema({
		created_at : { type: Date, default: Date.now() },
		updated_at : { type: Date },
		owner: { type: Schema.ObjectId, ref: 'User'},
		title: String ,
		description: String,
		users: [{ type: Schema.ObjectId, ref: 'User'}],
		comments: [{type: Schema.ObjectId, ref: 'Comment'}],
	})

// MIDDLEWARE
GroupSchema.pre('save', function(next){
	//set create and update
	now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
});

var Group = mongoose.model('Group', GroupSchema);

module.exports= Group;