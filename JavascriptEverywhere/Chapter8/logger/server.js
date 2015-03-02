var connect = require('connect');
var server = connect.createServer();
server.use(connect.logger('type is :res[content-type], length is :res[content-length] and it took :response-time ms.'));
server.use(connect.static(__dirname + '/website'));
server.listen(3000);
