//var https = require('https');
var request = require('request');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
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
	
  //res.redirect('http://google.com');
	
//	var url = 'https://data.sfgov.org/resource/6a9r-agq8.json';
//	var options = {
//		host: url
//	};
//	https.request(options, function(res) {
//		console.log('STATUS: ' + res.statusCode);
//		console.log('HEADERS: ' + JSON.stringify(res.headers));
//		res.setEncoding('utf8');
//		res.on('data', function (chunk) {
//			console.log('BODY: ' + chunk);
//		});
//	}).end();
})
 
app.listen(3000)
