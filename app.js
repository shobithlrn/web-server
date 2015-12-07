//Third party modules
var express = require('express');
var parser = require('body-parser');

//Custom modules
var middleware = require('./middleware');
var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(middleware.requireAuthentication);
app.use(parser.json());

app.post('/todos', middleware.logger, function(req, res) {
	var body = req.body;
	console.log(body.description);
	console.log(body.complete);
	db.todo.create({
		'description': body.description,
		'complete': body.complete
	}).then(function(todo) {
		res.json(todo);
	}).catch(function(e) {
		res.status(404).json(e);
	});
});

app.get('/todos', function(req, res) {
	var query = req.query;
	var where = {};
	if (query.desc && query.desc.length) {
		where.description = {
			$like: '%' + query.desc + '%'
		};
	}
	if (query.com && query.com.length) {
		where.complete =JSON.parse(query.com);
	}
	console.log(where);
	db.todo.findAll({
		where: where
	}).then(function(data) {
		console.log(data);
		res.json(data);
	}).catch(function(e) {
		console.log(e);
		res.json(e);
	});

});
app.get('/todo/:id', function(req, res) {
	db.todo.findById(req.params.id).then(function(data) {
		console.log(data);
		res.json(data);
	}).catch(function(e) {
		console.log(e);
		res.json(e);
	});

});


db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('LISTENING TO PORT ' + PORT);
	});
});