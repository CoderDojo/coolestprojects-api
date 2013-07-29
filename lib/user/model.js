var sequelize  = require("sequelize")
var db         = require('../db')
var responses  = require('../responses')

module.exports = {
  dbTable: db.define('User', {
	  name: { type: sequelize.STRING, validate: { is: ["[A-Za-z]", 'i']} },
	  email: { type: sequelize.STRING, validate: { isEmail: true } },
	  password: { type: sequelize.STRING, validate: { isAlphanumeric: true } },
	  dojo: { type: sequelize.STRING, validate: { isAlphanumeric: true } },
	  session_hash: { type: sequelize.STRING, validate: { isAlphanumeric: true } }
  },
  {
    tableName: 'users',
    underscored: true
  }),
  getUser: function(requestHash, success) {
    var options = {
        where: {
            session_hash: requestHash
        },
        attributes: ["id", "name", "email", "dojo"]
    }
    module.exports.dbTable.find(options)
        .success(function (person) {
            if (person === null) {
                obj = responses.error("Access denied")
                res.jsonp(403, obj);
            } else {
                success(person)
            }
        })
    
  }
}