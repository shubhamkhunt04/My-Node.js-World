const express = require("express");
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello world");
});

app.get('/api/courses',(req,res)=>{
    res.send("Hello SHUBHAM");
});

app.get('/api/courses/:id',(req,res)=>{
    res.send("hello shubham khunt "+req.params.id);
});

app.get('/api/post/:year/:month/:date',(req,res)=>{
    res.send(req.params);
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})