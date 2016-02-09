var express = require("express");
var app = express();

var mongoose = require("mongoose");
var carRoutes = require("./routes/cars")(mongoose);

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use('/cars', carRoutes);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
