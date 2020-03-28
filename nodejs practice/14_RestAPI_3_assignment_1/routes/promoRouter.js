const express = require("express");
const bodyParser = require("body-parser");

const promotions = express.Router();

promotions.use(bodyParser.json());

promotions.route('/')
.all((req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the promotions to you');
})
.post((req,res,next)=>{
    res.end('Will add the promotions : '+req.body.name+' with details: '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation dose not support on /promotions');
})
.delete((req,res,next)=>{
    res.end('Deleting all the promotions !!');
});




promotions.route('/:promotionsId')
.all((req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send details of the promotios: '+req.params.promotionsId+' to you !!');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promotionsId/'+req.params.promotionsId);
})
.put((req,res,next)=>{
    res.write('Updating the promotions '+req.params.promotionsId+'\n')
    res.end('  Will update the promotion: '+req.body.name+' with details: '+req.body.description+' and price : '+req.body.price);
})
.delete((req,res,next)=>{
    res.end('Deleting promotions :'+req.params.promotionsId);
});



module.exports = promotions;