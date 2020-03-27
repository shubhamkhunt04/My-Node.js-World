const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser"); //midelware

const dishes = require('./routes/dishes');  // my own router
const dishId = require('./routes/dishId');
const leaders = require('./routes/leaders');
const leadersId = require('./routes/leadersId');
const promotions = require('./routes/promotions');
const promotionsId = require('./routes/promotionsId');


const hostname = "localhost";
const port = "3000";

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/dishes',dishes);
app.use('/dishes/',dishId);
app.use('/leaders',leaders);
app.use('/leaders/',leadersId);
app.use('/promotions',promotions);
app.use('/promotions/',promotionsId);


app.use(express.static(__dirname+'/public')); // root of this project and only accept GET requiest.

app.use((req,res,next)=>{               // All requiest handel
    //console.log(req.header);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express Server Shubham</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})