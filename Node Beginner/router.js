function route(pathname, handler, respone, request){
	console.log("About to route a request for " + pathname);
	if (typeof handler[pathname] === "function"){
		return handler[pathname](respone, request);
	}
	else {
		console.log("No request handler found for " + pathname);
		respone.writeHead(404, {"Content-Type": "text/plain"});
		respone.write("404 Not Found");
		respone.end();
		//return "404 Not found";
	}
}

exports.route = route;
