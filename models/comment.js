var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var CommentSchema = Schema({
		body: String,
		created_at : { type: Date, default: Date.now() },
		updated_at : { type: Date },
		user: { type: Schema.Types.ObjectId, ref: 'User'},
		post: {type: Schema.Types.ObjectId, ref: 'Post'},
		event: {type: Schema.Types.ObjectId , ref: 'Event'},
		group: {type: Schema.Types.ObjectId , ref: 'Group'},
	})

// MIDDLEWARE
CommentSchema.pre('save', function(next){
	//set create and update
	now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports= Comment;