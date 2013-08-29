var express = require('express');
var responses = require('../responses')
var app = module.exports = express();
var voteModel = require('./model');
var voteDb = voteModel.dbTable;
var userModel = require('../user/model')
var userDb = userModel.dbTable

app.get('/vote/add', function(req, res){
	var sessionHash = req.query.session_hash;
    var projectid = req.query.projectid;

    console.log(projectid)
    
    var passedHash = validateValue('session hash', sessionHash, res);
    //var passedProject = validateValue('project', projectid, res);

	if(passedHash) {
		findUserFromHash(sessionHash, projectid, res);
	} 
});

function findUserFromHash(sessionHash, projectid, res) {
	console.log('###### '+sessionHash + " " + projectid);
    userModel.getUser(sessionHash,res,function(user){
        console.log(user)
        addVote(user.id, projectid, res);
    })
}

function addVote(userId, projectid, res) {
	var curTime = new Date().getTime();
	var vote = {
        userid: userId,
        projectid: projectid,
        timeadded: curTime,
    }
    console.log("### " + vote.userid + " " + vote.projectid + " " + vote.timeadded);
    voteModel.addVote(vote, function() {
        var obj = {
                result: true,
                message: "Successfully added message"
        };
        res.jsonp(200, obj);
    }, function (err) {
            errorHandling(err, "Error adding vote", res);
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
