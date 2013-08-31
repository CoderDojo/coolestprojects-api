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
  countUserVotes: function(userid, success, error) {
        db.query('SELECT count(*) as count from vote where userid=?', 
          null, {raw: true}, [userid]).success(success).error(error);
  },
  checkVote: function(userid, projectid, success, error) {
        db.query('SELECT count(*) as count from vote where userid=? and projectid=?', 
          null, {raw: true}, [userid, projectid]).success(success).error(error);
  },
  status: function(success, error) {
        db.query('select distinct title, count(*) as count from project, vote where projectid=project.id group by 1 order by 2 desc limit 15', 
          null, {raw: true}, []).success(success).error(error);
  },
}