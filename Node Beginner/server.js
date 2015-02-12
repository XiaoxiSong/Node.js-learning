var http = require("http");
var url = require("url");

function start(route, handler){

	function onRequest(request, respone){
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log("request for " + pathname + " received");

		route(pathname, handler, respone, request);
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write(content);
		//response.end();
	}

	http.createServer(onRequest).listen(8888);

	console.log("server has started");
}

exports.start = start;
