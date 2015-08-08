'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  body: String,
  dateCreated: Date,
  author: String,
  answers: [{answer: String, votes: Number}],
  hiddenFromPublic: {type: Boolean, default: false}
});

// Non-sensitive info we'll be putting in the token
PollSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

module.exports = mongoose.model('Poll', PollSchema);
