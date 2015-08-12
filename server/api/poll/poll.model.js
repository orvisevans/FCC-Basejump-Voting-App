'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: {required: true, type: String},
  dateCreated: Date,
  author: String,
  answers: [{answer: {required: true, type: String}, votes: [{user: String}]}],
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
