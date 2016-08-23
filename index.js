//var https = require('https');
var request = require('request');
var express = require('express');
var app = express();

app.use(express.static('public'));

// TEST
// Lookup food truck by locatoinid, hard coded
app.get('/getsome', function (req, res) {
	console.log('get some');
	
//	var url = 'https://data.sfgov.org/resource/6a9r-agq8.json?locationid=762182';
	var url = 'https://data.sfgov.org/resource/6a9r-agq8.json?locationid=760178';
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
