var sequelize  = require("sequelize")
var sequelize  = require("sequelize")
var db         = require('../db')
var responses  = require('../responses')

module.exports = {
  dbTable: db.define('User', {
	  name: { type: sequelize.STRING, validate: { is: ["[A-Za-z]", 'i']} },
	  email: { type: sequelize.STRING, validate: { isEmail: true } },
	  password: { type: sequelize.STRING, validate: { isAlphanumeric: true } },
	  coderdojo: { type: sequelize.STRING, validate: { isAlphanumeric: true } },
	  session_hash: { type: sequelize.STRING, validate: { isAlphanumeric: true } }
  },
  {
    tableName: 'users',
    underscored: true
  }),
  getUser: function(session_hash, res, success) {
    var options = {
        where: {
            session_hash: session_hash
        },
        attributes: ["id", "name", "email", "coderdojo"]
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
  },
  verify: function(login, success, error) {
    var options = {
        where: {
            email: login.email,
            password: login.password
        },
        attributes: ["id", "name", "email", "coderdojo"]
    }
    module.exports.dbTable.find(options)
        .success(success).error(error);   
  },
  addUser: function(newUser, success, error) {
        db.query('INSERT INTO users (name, email, password, coderdojo) VALUES(?,?,?,?)', 
          null, {raw: true}, [newUser.name, newUser.email, newUser.password, newUser.coderdojo]).success(success).error(error);
  },
  addSessionKey: function(session, success, error) {
        db.query('UPDATE users SET session_hash = ? where email = ?', 
          null, {raw: true}, [session.sessionKey, session.email]).success(success).error(error);
  }
}