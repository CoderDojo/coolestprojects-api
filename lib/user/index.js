var express = require('express');
var responses = require('../responses')
var app = module.exports = express();

app.post('/user/login', function(req, res){
	
	var email = req.body.email;
    var password = req.body.password;
	var hashPassword = hash(password);
	
	var options = {
		where: [],
		fields: []
	}
	
	options['where'] = [["email", "=", email], "AND",
			["password", "=", hashPassword]];
	options['fields'] = ["name","email","coderdojo","session_hash"];
	
	var queryResult = db.user.select(options, function(err,data,fields){
		if(err){ 
			errorHandling(err, "login failed", res);
		} else if(!data || 0 === data.length) {
			obj = responses.error("Invalid username / password, please try again")
    		res.jsonp(500,obj);
		} else {
			var hashSession = hashSessionKey(email);
			updateSessionHash(email, res, hashSession);
		}
	});
})


app.post('/user/register', function(req, res){
	var email = req.body.email;
    var password = req.body.password;
    var coderdojo = req.body.coderdojo;
    var name = req.body.name;
    
    //validateEmail('email', email, res);
    var passedEmail = validateValue('email', email, res);
    var passedPassword = validateValue('password', password, res);
    var passedName = validateValue('name', name, res);

	var hashPassword = hash(password);

	if(passedEmail && passedPassword && passedName) {
		
		var dataObject = {
        	name: name,
        	email: email,
        	coderdojo: coderdojo,
        	password: hashPassword,
    	};
    	
		db.user.create(dataObject, function(err, info) {
        	if(err) {
    			errorHandling(err, "registration failed", res);
        	} else {
        		var obj = { result: true, message: "successful register" };
    			res.jsonp(200,obj);
        	}
    	});
	} 
});


function errorHandling(err, messageText, res) {
	console.log(err);
    var obj = responses.error(messageText);
    res.jsonp(500,obj);
}

function updateSessionHash(email, res, hashSession) {
	var dataObject = {};
	dataObject["session_hash"] = hashSession;

	var options = {
		where: []
	}
	
	options['where'] = [["email", "=", email]];

    db.user.update(options, dataObject, function(err, info) {
        if(err) {
    		errorHandling(err, "Login failed", res);
        } else {
        	var responseObject = {};
			responseObject["message"] = "Login successful";
			responseObject["session_hash"] = hashSession;
			var obj = responses.success(responseObject);
    		res.jsonp(200,obj);
        }
    });
}

function validateEmail(field, email, res) {
	if(email.indexOf("@") == -1  ||
		email.indexOf(".") == -1) {
		var obj = { result: false, message: "You need to enter a valid "+field+" value with @" };
    	res.jsonp(500,obj);
	}
}

function validateValue(field, value, res) {
	if(!value || 0 === value.length) {
		var obj = { result: false, message: "You need to enter a valid "+field+" value" };
    	res.jsonp(500,obj);
	}
	return true;
}

function hash(value) {
	console.log("hash " + value);
	var crypto = require('crypto');
	var hash = crypto.createHash('md5').update(value).digest("hex");
	console.log("returned-hash " + hash);
	return hash;
}

function hashSessionKey(emailAddr) {
	var curTime = new Date().getTime();
	var random =  Math.random(); 
	return hash(curTime+random+emailAddr);
}