var express = require('express')
var routes = require('routes')
var socketio = require('socket.io')
var http = require('http')
var path = require('path')
var userModel = require('./lib/user/model.js')
var userDb = userModel.dbTable

var app = express()

var clients = {};
var socketsOfClients = {};

app.use(express.bodyParser());
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.set('port', 3000);
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
var message = require('./lib/messages')
var vote = require('./lib/vote')
var project = require('./lib/project')

app.use(user)
app.use(activity)
app.use(responses)
app.use(message)
app.use(vote)
app.use(project)

var server = app.listen(app.get('port'), function(){
  console.log("Coolest Projects server listening on port " + app.get('port'));
});

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
  socket.on('message', function(msg) {
    var sessionHash = msg.message.session_hash;

    userModel.getUser(sessionHash,'',function(user){
        console.log("$$$ USER "+user)
        if(user != null) 
            sendMessage(user.name)
    })

    function sendMessage(username) {
    	console.log('Send message from ' + username)
    	io.sockets.emit('message',
          {"author": username,
           "message": msg.message.message});
    }
  })
})
