var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('public'));

const LIMIT = 20;


// TEST
// Lookup food truck by locatoinid, hard coded
app.get('/getsome', function (req, res) {
	console.log('get some');
	
	var url = 'https://data.sfgov.org/resource/6a9r-agq8.json?locationid=762182';
	var json = '';
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			json = body;
		} else {
			console.error("Got an error: ", error, ", status code: ", response.statusCode)
		}
		res.send(json);
	}).end();
})

// Lookup food trucks by search area
app.post('/search', function (req, res) {
	var lat = req.body.lat;
	var lng = req.body.lng;
	var radius = req.body.radius;
	
	var url =
		'https://data.sfgov.org/resource/6a9r-agq8.json?$where=within_circle('
		+'location,' +lat+ ',' +lng+ ',' +radius+ ')&$limit=' +LIMIT;
	
	var json = '';
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			json = body;
		} else {
			console.error("Got an error: ", error, ", status code: ", response.statusCode)
		}
		res.send(json);
	}).end();
})


// 
// Start server
app.listen(3000)
