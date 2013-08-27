var sequelize  = require("sequelize")
var db         = require('../db')
var responses  = require('../responses')

module.exports = {
  dbTable: db.define('Activity', {
	  id: { type: sequelize.INTEGER},
	  userid: { type: sequelize.INTEGER},
	  timeadded: { type: sequelize.DATE },
	  steps: { type: sequelize.INTEGER},
    name: { type: sequelize.STRING}
  },
  {
    tableName: 'actvity',
    underscored: true
  }),
  addActivity: function(activity, success, error) {
        db.query('INSERT INTO activity (userid, steps, timeadded) VALUES(?,?,?)', 
          null, {raw: true}, [activity.userid, activity.steps, activity.timeadded]).success(success).error(error);
  },
  listActivities: function(success, error) {
        db.query('SELECT name, SUM(steps) AS "steps" from activity , users where userid = users.id order by 2 desc', 
          null, {raw: true}).success(success).error(error);
  },
}