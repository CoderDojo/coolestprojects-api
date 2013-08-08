var sequelize  = require("sequelize")
var db         = require('../db')
var responses  = require('../responses')

module.exports = {
  dbTable: db.define('Activity', {
	  id: { type: sequelize.INTEGER},
	  userid: { type: sequelize.INTEGER},
	  timeadded: { type: sequelize.DATE },
	  steps: { type: sequelize.INTEGER}
  },
  {
    tableName: 'actvity',
    underscored: true
  }),
  addActivity: function(activity, success, error) {
        db.query('INSERT INTO activity (userid, steps, timeadded) VALUES(?,?,?)', 
          null, {raw: true}, [activity.userid, activity.steps, activity.timeadded]).success(success).error(error);
  },
}