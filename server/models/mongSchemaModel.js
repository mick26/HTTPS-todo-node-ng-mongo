/*
http://mongoosejs.com/docs/guide.html
Everything in Mongoose starts with a Schema. 
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * CREATE A MONGOOSE SCHEMA 
 * Ref. http://mongoosejs.com/docs/schematypes.html
 */
var todoSchema = new Schema({
	text : String,
	age: Number,
	address: String,
	done : Boolean
});

//To add additional keys later, use the Schema#add method


/**
 * CREATE A MONGOOSE MODEL - mongoose.model(modelName, schema)
 */
module.exports = mongoose.model('Todo', todoSchema );


/**
 * Open Mongoose Connection to DB
 */
var db = mongoose.connection;
db.on('error', console.error);
