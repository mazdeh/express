var express = require('express');
var path = require('path');
var hbs = require('hbs');

var app = express();

// congigure app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

// define routes
app.get('/users', function (req, res) {
	// dummy data -- should hook this up to a DB
		console.log('called')
		var users = [
			{
				"id": "1234",
				"firstname": "vahid",
				"lastname": "mazdeh",
				"age": 2
			}
		];

		if(users.length === 0) {
			res.send([]);
		} else {
			res.send(users);
		}
});

var port = 3000;
app.listen(port, function () {
	console.log('Running on:', port);
})