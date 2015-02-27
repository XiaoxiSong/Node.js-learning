var http = require("http"),
    fs = require("fs");

var server = http.createServer(function(req, res){
    console.log(req.url);
    if ('GET' == req.method && '/images' == req.url.substr(0,7) && '.jpg' == req.url.substr(-4)){
        fs.stat(__dirname + req.url, function(err, stat){
            if(err || !stat.isFile()){
                res.writeHead(404);
                res.write('Not Found');
                return;
            }
        });
        serve(__dirname + req.url, 'application/jpg');
    }
    else if('GET' == req.method && '/' == req.url){
        console.log(req.url);
        serve(__dirname + req.url, 'text/html');
    }
    else{
        res.writeHead(404);
        res.write('Not Found');
    }

    function serve(path, type){
        console.log(path);
        res.writeHead(200);
        fs.createReadStream(path).pipe(res);
    }
});

server.listen(3000);
