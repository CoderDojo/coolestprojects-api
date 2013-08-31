var sequelize  = require("sequelize")
var db         = require('../db')
var responses  = require('../responses')

module.exports = {
  dbTable: db.define('Messages', {
	  id: { type: sequelize.INTEGER},
	  userid: { type: sequelize.INTEGER},
	  timeadded: { type: sequelize.DATE },
	  message: { type: sequelize.STRING},
    name: { type: sequelize.STRING}
  },
  {
    tableName: 'messages',
    underscored: true
  }),
  addMessage: function(messageObj, success, error) {
        db.query('INSERT INTO messages (userid, message, timeadded) VALUES(?,?,?)', 
          null, {raw: true}, [messageObj.userid, messageObj.message, messageObj.timeadded]).success(success).error(error);
  },
  listMessages: function(success, error) {
        db.query('SELECT name as author, message from messages, users where userid = users.id order by timeadded desc LIMIT 50', 
          null, {raw: true}).success(success).error(error);
  },
}