var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = Schema({
  title  : String,
  description: String,
  location: Object,
  date: { type: Date },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
  user : {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  rsvp: {type: Schema.Types.ObjectId, ref: 'Rsvp'},
  color: String,
});


// MIDDLEWARE
EventSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


var Event = mongoose.model('Event', EventSchema);

module.exports = Event;