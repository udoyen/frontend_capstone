var express = require('express');
var app = express();

// // Load the full build.
// var _ = require('lodash');
// // Load the core build.
// var _ = require('lodash/core');
// // Load the FP build for immutable auto-curried iteratee-first data-last methods.
// var fp = require('lodash/fp');

// // Load method categories.
// var array = require('lodash/array');
// var object = require('lodash/fp/object');

// // Cherry-pick methods for smaller browserify/rollup/webpack bundles.
// var at = require('lodash/at');
// var curryN = require('lodash/fp/curryN');
// Serve static directories
app.use(express.static(__dirname + '/app'));

// Serve up bower_components directory
app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));
app.use('/angular', express.static('bower_components/angular'));
app.use('/fontawesome', express.static('node_modules/font-awesome/css'));

app.use(function(req, res) {
  res.sendFile(__dirname + '/app/index.html')
});

// Pick a port to listen on
app.listen(8080, function () {
  console.log('Our app is listenning on port 8080!');
});

