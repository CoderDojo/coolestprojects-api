var sequelize = require("sequelize")

var User = db.define('User', {
	name: { type: sequelize.STRING, validate: { is: ["[A-Za-z]", 'i']} },
	email: { type: sequelize.STRING, validate: { isEmail: true } },
	password: { type: sequelize.STRING, validate: { isAlphanumeric: true } },
	dojo: { type: sequelize.STRING, validate: { isAlphanumeric: true } },
	session_hash: { type: sequelize.STRING, validate: { isAlphanumeric: true } }
},
{
	tableName: 'users',
	underscored: true
})

module.exports = User