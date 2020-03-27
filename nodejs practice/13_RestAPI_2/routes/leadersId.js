const express = require("express");
const bodyParser = require("body-parser");

const leadersId = express.Router();

leadersId.use(bodyParser.json());

leadersId.route('/:leadersId')
.all((req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send details of the leaders: '+req.params.leadersId+' to you !!');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+req.params.leadersId);
})
.put((req,res,next)=>{
    res.write('Updating the leaders '+req.params.leadersId+'\n')
    res.end('  Will update the leaders: '+req.body.name+' with details: '+req.body.description+' and price : '+req.body.price);
})
.delete((req,res,next)=>{
    res.end('Deleting leaders :'+req.params.leadersId);
});


module.exports = leadersId;