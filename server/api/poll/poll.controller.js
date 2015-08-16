'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of public polls
exports.index = function(req, res) {
  Poll.find({hiddenFromPublic: false}, function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.extend(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Returns polls by a user in the DB.
exports.indexUser = function(req, res) {
  var filter = {author:req.params.userid, hiddenFromPublic: false};
    Poll.find(filter, function (err, polls) {
        if(err) { return handleError(res, err); }
        res.status(200).json(polls);
    });
};

// Returns polls by a user in the DB.
exports.indexUserWithHidden = function(req, res) {
  var filter = {author:req.params.userid};
    Poll.find(filter, function (err, polls) {
        if(err) { return handleError(res, err); }
        res.status(200).json(polls);
    });
};

// Adds a vote to a poll in the DB.  req.body should be a user's ID
exports.addVote = function(req, res) {
  var pollId = req.params.id;
  var userId = req.body.user;
  var answerIndex = req.body.answerIndex;
  Poll.findById(pollId, function (err, poll) {
    //check for errors
    if (err) { return handleError(res, err); }
    if (!poll) { return res.status(404).send('Poll Not Found'); }
    if (!poll.answers[answerIndex]) { return res.status(404).send('Answer Not Found'); }

    //create a copy of the poll
    var updatedPoll = _.extend({}, poll);

    //check if user has voted already.  If so, remove all other votes by the user before voting.
    updatedPoll = removeVotesbyUser(updatedPoll, userId);

    //register vote and save
    updatedPoll._doc.answers[answerIndex].votes.push({user: userId});
    updatedPoll.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });

  })
}

function handleError(res, err) {
  return res.status(500).send(err);
}

function removeVotesbyUser(poll, userId) {
  poll._doc.answers = poll._doc.answers.map(function(answer) {
    answer.votes = answer.votes.filter(function(vote) {
      return vote.user !== userId;
    });
    return answer;
  });
  return poll;
}
