const express = require("express");
const bodyParser = require("body-parser");

const leaders = express.Router();

leaders.use(bodyParser.json());

leaders.route('/')
.all((req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the leaders to you');
})
.post((req,res,next)=>{
    res.end('Will add the leader : '+req.body.name+' with details: '+req.body.description+' and price : '+req.body.price);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation dose not support on /leaders');
})
.delete((req,res,next)=>{
    res.end('Deleting all the leaders !!');
});


module.exports = leaders;