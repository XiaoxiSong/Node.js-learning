var net = require("net");
var count = 0;
var server = net.createServer(function(conn){
    console.log('\033[90m   new connection!\033[39m');
    conn.write(
        '\n > welcome to \033[92mnode-chat\033[39m!'
        + '\r\n > ' + count + ' other people ar connected at this time.'
        + '\r\n > please write your nikcname and press enter: '
        );
    count++;
    conn.setEncoding('utf8');

    conn.on('close', function(){
        count--;
    });

    conn.on('data', function(data){
        console.log(data);
    });
});

server.listen(3000, function(){
    console.log('\033[96m   server listening on *:3000\033[39m');
});
