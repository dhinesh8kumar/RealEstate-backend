const a = require("http");

var db = require("./db");

a.createServer( function(req, res){
  switch(req.url){
    case "/db": db(); break;
    default: res.write("This is index.js"); 
  }
  res.end();
}).listen(2000, ()=>{
  console.log("Listening to port 2000");
})

