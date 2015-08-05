/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'testuser',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Poll.find({}).remove(function() {
  Poll.create({
    name: "TestPoll",
    body: "Who's the better user?",
    dateCreated: Date.now(),
    author: "55c170c6284ea64d2c29b3eb",
    answers: [{answer: "TestUser", votes: 1}, {answer: "Admin", votes: 2}],
    hiddenFromPublic: false
  }, {
    name: "TestPoll",
    body: "What's up?",
    dateCreated: Date.now(),
    author: "55c170c6284ea64d2c29b3eb",
    answers: [{answer: "Nothing Much", votes: 1}, {answer: "Everything!", votes: 2}],
    hiddenFromPublic: false
  }, {
    name: "TestPoll",
    body: "Can You See Me?",
    dateCreated: Date.now(),
    author: "TestUser",
    answers: [{answer: "Yes", votes: 1}, {answer: "no", votes: 0}],
    hiddenFromPublic: true
  });
});