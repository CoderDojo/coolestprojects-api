var express = require('express')
var routes = require('routes')
var socketio = require('socket.io')
var http = require('http')
var path = require('path')

var app = express()

app.use(express.bodyParser());
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var user = require('./lib/user')
var activity = require('./lib/activity')
var responses = require('./lib/responses')





app.use(user)
app.use(activity)
app.use(responses)

app.listen(process.env.PORT || 3000)
console.log("Listening on port "+(process.env.PORT || 3000))
