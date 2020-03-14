// triger custom event in nodejs

const events = require("events");
const event = new events.EventEmitter();

// syntax : event.on('name',function)
event.on('abcclick',()=>console.log("First event created"));
event.emit('abcclick');


// with parameter
event.on('click',(a,b)=>console.log("Sum is "+(a+b)));
event.emit('click',3,4);