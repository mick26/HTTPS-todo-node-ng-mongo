/*=========================================================
Michael Cullen

Self Signed OpenSSL Certificate

Connect Node over https

Todo CRUD - Express 4 / Mongoose / Angular 
server.js

2014
Working - (Tá se ag obair)
============================================================*/


/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express  = require('express');						//Express v4.1 Web server
var mongoose = require('mongoose'); 					//mongoose for mongodb
var logger   = require('morgan');						//logger middleware
var bodyParser = require('body-parser');				//middleware to read Http packet content using req.body etc
var https = require('https');							//SSL encryption
var fs = require('fs-extra');							//file system package
/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */

var database = require('./server/config/database'); 	//database config - i.e. Local/remote MongoDB URL
var routes = require('./server/routes.js');				//Exchange routes & mongoose interaction with DB


/* ========================================================== 
OpenSSL credentials - read private key and cert files
Reading them Synchronous - Node will be blocking until files are read
ok in this instance. 
============================================================ */
var privateKey = fs.readFileSync('./server/ssl/localhost/server.key'); 
var certificate = fs.readFileSync('./server/ssl/localhost/server.crt'); 

var credentials = { key : privateKey, cert: certificate };

/* ========================================================== 
Port the server will listen on
============================================================ */
var port = process.env.PORT || 3085; 					//set the port

/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express(); 		

/* ========================================================== 
Connect to mongoDB database - DB URL specified in database.js
============================================================ */
mongoose.connect(database.url); 	

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 

/* ========================================================== 
Use Middleware
============================================================ */
app.use(logger('dev')); 	//log every request to the console
app.use(bodyParser()); 		//Get info from $HTTP POST/PUT packets - needed for req.body


/* ========================================================== 
ROUTES - using Express
============================================================ */
routes(app);


/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
console.log("PORT = " + port);


var secureServer = https.createServer( credentials, app);
secureServer.listen(port, function() {
    console.log('Secure Express server listening on port %d ', secureServer.address().port);
	console.log("========LISTENING=========")
});
