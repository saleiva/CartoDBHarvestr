
var request = require('request');
var url = require('url');
var http = require('http');

function getPage (someUri, callback) {
	request({uri: someUri}, function (error, response, body) {
		console.log("Fetched " +someUri+ " OK!");
		callback(body);
	});
}

var server = http.createServer(function (request, response) {
	uri = "http://search.twitter.com/search.json?q=blue%20angels&amp;rpp=5&amp;include_entities=true&amp;result_type=mixed"
	console.log("Got request for " +uri);
	if (!uri.match('^http')) {
		console.log("requested URI is not a valid URL!  Dropping request...");
		response.writeHead(400, {"Content-Type": "text/html"})
		response.end("Invalid url");
	} else {
		getPage(uri, function(body) {
			response.writeHead(200, {"Content-Type": "text/html"}),
			response.write(body),
			response.end("-----THE END-----")
		})
	}
});

server.listen(8000);

console.log("Server running at http://127.0.0.1:8000");