/*================================================================
	Server side Routing using Express / Mongoose / MongoDB
=================================================================*/

//Get the Mongoose Model
var TodoModel = require('./models/mongSchemaModel');

module.exports = function(app) 
{

	/*================================================================
		CREATE - $http post
	=================================================================*/

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) 
	{

		// create a todo, information comes from AJAX request from Angular
		TodoModel.create(
		{
			text : req.body.text,
			done : false
		}, 

		function(err, todo) 
		{
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			TodoModel.find(function(err, todos) 
			{
				if (err)
				{
					return res.send(err);
				}
				else
				{
					return res.json(todos);
				}
			});
		});

	});

	/*================================================================
		READ - $http get
	=================================================================*/
	app.get('/api/todos', function(req, res) 
	{
		// use mongoose to get all todos in the database
		TodoModel.find(function(err, todos) 
		{

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
			{
				return res.send(err);
			}
			else
			{
				return res.json(todos); // return all todos in JSON format
			}
		});
	});


	/*================================================================
		UPDATE - $http put
	=================================================================*/

	app.put('/api/todos/:todo_id', function(req, res) 
	{

		var query = { "_id" : req.params.todo_id };
		var update = {text: req.body.text, done: req.body.done};
		var id = req.params.todo_id;
		/*
		console.info("Body: " + JSON.stringify(req.body));		//TEST
		console.info("Params: " + JSON.stringify(req.params));	//TEST
		console.info("Done: " + req.body.done);					//TEST
		console.info("Update: " + JSON.stringify(update));		//TEST
		console.log("ID: " + id);
		*/

		TodoModel.findByIdAndUpdate(id ,update, function(err, todo) {
			
			if (err)
				res.send(err);

			// get and return all the todos after you Update one
			TodoModel.find(function(err, todos) 
			{
				if (err)
				{
					return res.send(err);
				}
				else
				{
					return res.json(todos);
				}
			});
		});
	});


	/*================================================================
		DELETE - $http delete
	=================================================================*/

	app.delete('/api/todos/:todo_id', function(req, res) 
	{
		TodoModel.remove(
		{
			_id : req.params.todo_id
		}, 

		function(err, todo) 
		{
			if (err)
				res.send(err);

			//get and return all the todos after you delete one
			TodoModel.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	
	app.get('*', function(req, res) 
	{
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};