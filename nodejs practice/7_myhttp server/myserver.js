const http = require("http")
const server = http.createServer(function(req,res){
    
    res.writeHead(200,{"content-type":"text/html"})
    res.write("<h1>shubham is running</h1>");
    res.end();
    
}).listen(3000,()=>console.log("Your server is Running..."))