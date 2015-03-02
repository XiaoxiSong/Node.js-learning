var connect = require('connect'),
    fs = require('fs');

var server = connect(
        connect.bodyParser(),
        connect.static('static'),
        function(req, res, next){
            if('POST' == req.method && req.body.file){
                console.log(req.body.file);
                fs.readFile(req.body.file.path, 'utf8', function(error, data){
                    if(error){
                        res.writeHead(500);
                        res.end('Error!');
                        return;
                    }
                    res.writeHead(200, {'Content-Type' : 'text/html'});
                    res.end([
                        '<h3>File: ' + req.body.file.name + '</h3>',
                        + '<h4>Type: ' + req.body.file.type + '</h4>',
                        + '<h4>Contents:</h4><pre>' + data + '</pre>'
                        ].join(''));
                });
            }
            else{
                next();
            }
        });
server.listen(3000);

