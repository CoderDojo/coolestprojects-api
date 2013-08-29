var sequelize  = require("sequelize")
var db         = require('../db')
var responses  = require('../responses')

module.exports = {
  dbTable: db.define('Vote', {
	  id: { type: sequelize.INTEGER},
	  userid: { type: sequelize.INTEGER},
	  timeadded: { type: sequelize.DATE },
	  projectid: { type: sequelize.INTEGER}
  },
  {
    tableName: 'vote',
    underscored: true
  }),
  addVote: function(vote, success, error) {
        db.query('INSERT INTO vote (userid, projectid, timeadded) VALUES(?,?,?)', 
          null, {raw: true}, [vote.userid, vote.projectid, vote.timeadded]).success(success).error(error);
  },
}