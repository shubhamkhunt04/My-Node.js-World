const express = require("express");
const bodyParser = require("body-parser");

const disRouter = express.Router();

disRouter.use(bodyParser.json());

disRouter.route('/')
.all((req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the dishes to you');
})
.post((req,res,next)=>{
    res.end('Will add the dish : '+req.body.name+' with details: '+req.body.description+' and price : '+req.body.price);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation dose not support on /dishes');
})
.delete((req,res,next)=>{
    res.end('Deleting all the dishes !!');
});


module.exports = disRouter;