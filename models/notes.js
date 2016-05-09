var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NoteSchema = Schema({
	body: String,
	created_at: {type: Date, default: Date.now()},
	updated_at: {type: Date},
	user: [{type: Schema.Types.ObjectId, ref: "User"}],
});

NoteSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var Note = mongoose.mode('Note', NoteSchema);

module.exports = Note;