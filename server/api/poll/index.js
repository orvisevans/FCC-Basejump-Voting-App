'use strict';

var express = require('express');
var controller = require('./poll.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/user/:userid', controller.indexUser);
router.get('/all-from/user/:userid', controller.indexUserWithHidden);
router.put('/:id/add-vote', controller.addVote);

module.exports = router;
