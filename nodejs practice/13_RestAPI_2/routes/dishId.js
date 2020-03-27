const express = require("express");
const bodyParser = require("body-parser");

const dishId = express.Router();

dishId.use(bodyParser.json());

dishId.route('/:dishId')
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


module.exports = dishId;