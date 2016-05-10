var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
  title  : String,
  body   : String,
  created_at : { type: Date, default: Date.now() },
  updated_at : { type: Date },
  user : [{type: Schema.Types.ObjectId, ref: 'User'}],
});

// MIDDLEWARE
PostSchema.pre('save', function(next){
	//set create and update
	now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;