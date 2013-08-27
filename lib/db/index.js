var dbConfig = require('../../config/database')
var sequelize = require("sequelize")
module.exports = new sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	port: dbConfig.port
})
