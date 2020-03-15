const fs = require("fs");

// For reading file.
fs.readFile(__dirname+"/text.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log(data);
}
);


// For deleting file(text.txt)
// fs.unlink(__dirname+"/text.txt",(err,data)=>{
//     if(err) throw err;
//     console.log("File deleted ");
// }
// );