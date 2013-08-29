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

	if(passedHash) {
		findUserFromHash(sessionHash, projectid, res);
	} 
});

function findUserFromHash(sessionHash, projectid, res) {
	console.log('###### '+sessionHash + " " + projectid);
    userModel.getUser(sessionHash,res,function(user){
        console.log(user)
        validateVoteCount(user.id, projectid, res);
    })
}

function validateVoteCount(userId, projectId, res) {
    voteModel.countUserVotes(userId, function(result) {
        var curCount = result[0].count;
        console.log(userId + "  "  + curCount);
        if(curCount < 6) {//can only have 3 votes per person    
            validateNotVotedForProject(userId, projectId, res);
        } else {
            errorHandling('Error validating remaining votes', "You have no votes remaining, sorry", res);
        }
    }, function (err) {
            errorHandling(err, "Error adding vote", res);
    });
}


function validateNotVotedForProject(userId, projectId, res) {
    voteModel.checkVote(userId, projectId, function(result) {
        var curCount = result[0].count;
        console.log(userId + "  "  + curCount);
        if(curCount < 1) {//can only have 3 votes per person    
            addVote(userId, projectId, res);
        } else {
            errorHandling('Error validating project', "You have already voted for this project, sorry", res);
        }
    }, function (err) {
            errorHandling(err, "Error adding vote", res);
    });
}

function addVote(userId, projectId, res) {
	var curTime = new Date().getTime();
	var vote = {
        userid: userId,
        projectid: projectId,
        timeadded: curTime,
    }
    console.log("### " + vote.userid + " " + vote.projectid + " " + vote.timeadded);
    voteModel.addVote(vote, function() {
        var obj = {
                result: true,
                message: "Successfully added vote"
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
