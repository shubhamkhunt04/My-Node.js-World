// Regular funcion
function sum(a,b)
{
    return a+b;
}

console.log(sum(8,2));

//Anonymous function
const user = function()
{
    console.log("Hello Shubham");
}

user();

// Arrow function
const arrow = ()=> console.log("Hello Shubham Khunt");

arrow();

const add = (a,b) => {
    let c = a + b;
    console.log(c);
}

add(5,7);

var tempvariable = "shubham is good boy"
module.exports.myname = tempvariable
