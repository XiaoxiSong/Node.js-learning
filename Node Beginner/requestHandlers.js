var exec = require("child_process").exec;
var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable"),
	sys = require("sys");;

function start(respone){
	console.log("Request handler 'start' was called.");
	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Contenet-Type" content="text/html ' +
		'charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" enctype="multipart/form-data" method="post">' +
		'<input type="file" name="upload" multiple="multiple">' +
		'<input type="submit" value="Upload File" />'+
		'</form>'+
		'</body>'+
		'</html>';
	respone.writeHead(200, {"Content-Type": "text/html"});
	respone.write(body);
	respone.end();
	//function sleep(milliSecond){
	//	var startTime = new Date().getTime();
	//	while(new Date().getTime() < startTime + milliSecond);
	//}
	//sleep(10000);
	//return "Hello Start";
	//exec("ls -lah", function (error, stdout, stderr) {
	//	respone.writeHead(200, {"Content-Type": "text/plain"});
	//	respone.write(stdout);
	//	respone.end();
	//});
}

function upload(respone, request){
	console.log("Request handler 'upload' was called");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files){
		console.log("parse done");
		console.log(sys.inspect({fields: fields, files: files}));
		fs.renameSync(files.upload.path, "./tmp/test.png");	
		respone.writeHead(200, {"Content-Type": "text/html"});
		respone.write("received image: <br/>");
		respone.write("<image src='/show'/>");
		respone.end();
	});
}

function show(respone){
	console.log("Request handler 'show' was called.");
	fs.readFile("./tmp/test.png", "binary", function(error, file){
		if(error){
			respone.writeHead(500, {"Content-Type": "text/plain"});
			respone.write(error + "\n");
			respone.end();
		}
		else{
			respone.writeHead(200, {"Content-Type": "image/png"});
			respone.write(file, "binary");
			respone.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
