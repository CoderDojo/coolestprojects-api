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
  addMessage: function(message, success, error) {
        db.query('INSERT INTO messages (userid, text, timeadded) VALUES(?,?,?)', 
          null, {raw: true}, [messsage.userid, message.message, activity.timeadded]).success(success).error(error);
  },
  listMessages: function(success, error) {
        db.query('SELECT name, message from message , users where userid = users.id order by timeadded desc', 
          null, {raw: true}).success(success).error(error);
  },
}