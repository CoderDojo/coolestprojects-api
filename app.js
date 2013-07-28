var express = require('express')
var app = express()
app.use(express.bodyParser());

var dbConfig = require('./config/database')
var sequelize = require("sequelize")
db = new sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	port: dbConfig.port
})
var userModel = require("./lib/user/model")

app.get('/', function(req,res) {
	userModel.find({ where: {id: 1}}).success(function(userRecord){
		res.json(userRecord)
	});
})

var user = require('./lib/user')
var activity = require('./lib/activity')
var responses = require('./lib/responses')

app.use(user)
app.use(activity)
app.use(responses)

app.listen(process.env.PORT || 3000)
console.log("Listening on port "+(process.env.PORT || 3000))