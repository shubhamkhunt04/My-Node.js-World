const http = require("http")
const fs = require("fs")
const server = http.createServer(function(req,res){

fs.readFile(__dirname+"/readme.html",(err,data)=>{

    res.writeHead(200,{"content-type":"text/html"})
    res.write(data);
    res.end();
});

}).listen(3000,()=>console.log("Server is Running on port 3000"));