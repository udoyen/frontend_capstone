var express = require('express');
var app = express();

// Serve static directories
app.use(express.static(__dirname + '/app'));

// Serve up bower_components directory
app.use('/bower_components', express.static('bower_components'));
app.use('/angular', express.static('bower_components/angular'));

app.use(function(req, res) {
  res.sendFile(__dirname + '/app/index.html')
});

// Pick a port to listen on
app.listen(3000, function () {
  console.log('Our app is listenning on port 3000!');
});

