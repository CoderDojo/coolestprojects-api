var express = require('express');
var responses = require('../responses')
var app = module.exports = express();
var activityModel = require('./model');
var activityDb = activityModel.dbTable;
var userModel = require('../user/model')
var userDb = userModel.dbTable

app.post('/activity/add', function(req, res){
	var sessionHash = req.body.session_hash;
    var steps = req.body.steps;
    
    var passedHash = validateValue('session hash', sessionHash, res);
    var passedSteps = validateValue('steps', steps, res);
    
	if(passedHash && passedSteps) {
		updateStepsUsingHash(sessionHash, steps, res);
	} 
});

app.post('/activity/list', function(req, res){
    var sessionHash = req.body.session_hash;
     
    if(sessionHash) {
        listStepsUsingHash(sessionHash, res);
    } 
});

function listStepsUsingHash(sessionHash, res) {
    console.log('###### '+sessionHash);
    userModel.getUser(sessionHash,res,function(user){
        console.log("$$$ USER "+user)
        if(user != null)
            listSteps(res);
    })
}

function updateStepsUsingHash(sessionHash, steps, res) {
	console.log('###### '+sessionHash + " " + steps);
    userModel.getUser(sessionHash,res,function(user){
        console.log(user)
        updateSteps(user.id, steps, res);
    })
}

function updateSteps(userId, steps, res) {
	var curTime = new Date().getTime();
	var activity = {
        userid: userId,
        steps: steps,
        timeadded: curTime,
    }
    console.log("### " + activity.userid + " " + activity.steps + " " + activity.timeadded);
    activityModel.addActivity(activity, function() {
        var obj = {
                result: true,
                message: "Successfully added message"
        };
        res.jsonp(200, obj);
    }, function (err) {
            errorHandling(err, "Error adding steps", res);
    });
}

function listSteps(res) {
    activityModel.listActivities(function(data) {
        var obj = {
                result: true,
                activities: data
        };
        res.jsonp(200, obj);
    }, function (err) {
            errorHandling(err, "Error adding steps", res);
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
