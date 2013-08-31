var express = require('express');
var responses = require('../responses')
var app = module.exports = express();
var messageModel = require('./model');
var messageDb = messageModel.dbTable;
var userModel = require('../user/model')
var userDb = userModel.dbTable

app.post('/message/add', function(req, res){
	var sessionHash = req.body.session_hash;
    var message = req.body.message;
    
    var passedHash = validateValue('session_hash', sessionHash, res);
    var passedMessage = validateValue('message', message, res);
    
	if(passedHash && passedMessage) {
		updateMessagesUsingHash(sessionHash, message, res);
	} 
});

app.get('/message/list', function(req, res){
   listMessages(res);
});

function listMessagesUsingHash(sessionHash, res) {
    console.log('###### '+sessionHash);
    userModel.getUser(sessionHash,res,function(user){
        console.log("$$$ USER "+user)
        if(user != null)
            listMessages(res);
    })
}

function updateMessagesUsingHash(sessionHash, message, res) {
	console.log('###### '+sessionHash + " " + message);
    userModel.getUser(sessionHash,res,function(user){
        updateMessage(user.id, message, res);
    })
}

function updateMessage(userId, message, res) {
	var curTime = new Date().getTime();
	var messageObj = {
        userid: userId,
        message: message,
        timeadded: curTime,
    }
    console.log("### " + messageObj.userid + " " + messageObj.message + " " + messageObj.timeadded);
    messageModel.addMessage(messageObj, function() {
        var obj = {
                result: true,
                message: "Successfully added message"
        };
        res.jsonp(200, obj);
    }, function (err) {
            errorHandling(err, "Error adding steps " + err, res);
    });
}

function listMessages(res) {
    messageModel.listMessages(function(data) {
        var obj = {
                result: true,
                messages: data
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

function getMessage() {
    console.log("££333333");
}
