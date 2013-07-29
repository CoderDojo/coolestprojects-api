var dbConfig = require('./config/database')
var sequelize = require("sequelize")
db = new sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	port: dbConfig.port
})
var userModel = require("./lib/user/model")
userModel.dbTable.sync({force: true}).success(function(){
	userModel.dbTable.create({
		name: "Dan Iuffy",
		email: "dmiuffy15@example.com",
		password: "098f6bcd4621d373cade4e832627b4f6",
		dojo: "DCU",
		session_hash: "7574d936a15fd075d2d82c5e87b64f7c"
	})
})
