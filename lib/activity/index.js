var express = require('express');
var responses = require('../responses')
var app = module.exports = express();

app.post('/activity/add', function(req, res){
	var sessionHash = req.body.session_hash;
    var steps = req.body.steps;
    
    var passedHash = validateValue('session hash', sessionHash, res);
    var passedSteps = validateValue('steps', steps, res);
    
	if(passedHash && passedSteps) {
		findUserFromHash(sessionHash, steps, res);
	} 
});



function findUserFromHash(sessionHash, steps, res) {
	console.log('###### '+sessionHash + " " + steps);
	var options = {
		where: [],
		fields: []
	}
	
	options['where'] = [["session_hash", "=", sessionHash]];
	options['fields'] = ["id"];
	
	var queryResult = db.user.select(options, function(err,data,fields){
		if(err){ 
			errorHandling(err, "Adding activity failed", res);
		} else if(!data[0] || 0 === data[0].length) {
			errorHandling(err, "Invalid session key please login", res);
		} else {
			console.log(data);
			var userId = data[0]['id'];
			updateSteps(userId, steps, res);
		}
	});
}

function updateSteps(userId, steps, res) {
	var curTime = new Date().getTime();
	var dataObject = {
        	userid: userId,
        	steps: steps,
        	timeadded: curTime,
    };
    console.log("### " + dataObject.userid + " " + dataObject.steps + " " + dataObject.timeadded);
	db.activity.create(dataObject, function(err, info) {
       	if(err) {
    		errorHandling(err, "activity add failed", res);
       	} else {
       		var obj = { result: true, message: "successful adding of activity" };
    		res.jsonp(200,obj);
       	}
	});
}

function errorHandling(err, messageText, res) {
	console.log(err);
    var obj = responses.error(messageText);
    res.jsonp(500,obj);
}

function validateValue(field, value, res) {
	if(!value || 0 === value.length) {
		var obj = { result: false, message: "You need to enter a valid "+field+" value" };
    	res.jsonp(500,obj);
	}
	return true;
}
