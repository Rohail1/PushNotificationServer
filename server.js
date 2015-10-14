var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  parser = new require('xml2json');
 var fs = require('fs');
app.listen(3000);

console.log("The server is listening on LocalHost:3000 ");

function handler(req,res)
{
  fs.readFile(__dirname + '/client.html',function(err,data){
        if(err){
          console.log(err);
          res.writeHead(500);
          return res.end("Error loading client");
        }
        res.writeHead(200);
        return res.end(data);
  });
}

io.sockets.on('connection',function(socket){
  console.log(__dirname);
  fs.watchFile(__dirname+'/example.xml',function(curr,prev){
      fs.readFile(__dirname+'/example.xml',function(err,data){
        if(err) throw  err;
        var json = parser.toJson(data);
        socket.volatile.emit('notification',json);
      });
  });
});