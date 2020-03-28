const express = require("express");
const bodyParser = require("body-parser");

const dishes = express.Router();

dishes.use(bodyParser.json());

dishes.route('/')
.all((req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the dishes to you');
})
.post((req,res,next)=>{
    res.end('Will add the dish : '+req.body.name+' with details: '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation dose not support on /dishes');
})
.delete((req,res,next)=>{
    res.end('Deleting all the dishes !!');
});


dishes.route('/:dishId')
.all((req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send details of the dish: '+req.params.dishId+' to you !!');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+req.params.dishId);
})
.put((req,res,next)=>{
    res.write('Updating the dishes '+req.params.dishId+'\n')
    res.end('  Will update the dish: '+req.body.name+' with details: '+req.body.description+' and price : '+req.body.price);
})
.delete((req,res,next)=>{
    res.end('Deleting dishes :'+req.params.dishId);
});


module.exports = dishes;