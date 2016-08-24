var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

// json POST
app.use(bodyParser.json());
// app.use(express.json());

// serve static files
app.use(express.static('public'));

const LIMIT = 20;

// TEST
// Lookup food truck by locatoinid, hard coded
app.get('/getsome', function (req, res) {
	console.log('get some');
	
	var url = 'https://data.sfgov.org/resource/6a9r-agq8.json?locationid=762182';
//	var url = 'https://data.sfgov.org/resource/6a9r-agq8.json?locationid=760178';
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
// TODO
// TODO
// TODO
// TODO get post data
app.post('/search', function (req, res) {
	console.log('** search');
	console.log('** req.body ', req.body);
	//console.log('** req.body.lat ', req.body.lat);
	//var lat = req.body.lat;
	
	var url = 'https://data.sfgov.org/resource/6a9r-agq8.json?$where=within_circle(location,37.758,-122.389,500)&$limit='+LIMIT;
	
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
