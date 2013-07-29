var express = require('express')
var app = express()
app.use(express.bodyParser());

var user = require('./lib/user')
var activity = require('./lib/activity')
var responses = require('./lib/responses')

app.use(user)
app.use(activity)
app.use(responses)

app.listen(process.env.PORT || 3000)
console.log("Listening on port "+(process.env.PORT || 3000))