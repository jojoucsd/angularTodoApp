var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
  title  : String,
  body   : String,
  created_at : { type: Date, default: Date.now() },
  updated_at : { type: Date },
  user : [{type: Schema.Types.ObjectId, ref: 'User'}]
});

// MIDDLEWARE

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;