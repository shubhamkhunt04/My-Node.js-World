// ECMASCCRIPT ES6 2015
// let , const ,templating string ,class


// let
let a = 10

function printer()
{
    let a = 20
    console.log("Inside function a = "+a);
}
console.log("Outside function a = "+a);
printer()


// const
const x = 100
//x = 50 --> Error because x is constant variable.

const person = {
    "name":"Shubham khunt",
    "age":19,
    "college":"CGPIT"
}

console.log(person) // Print object elements
person.name = "SHUBHAM"
console.log(person) // We can change constant object values so name : 'SHUBHAM'



// template string
let names = "shubham"
let ages  = 19

console.log("Hello "+names+" , Your age is "+ages)
console.log("Hello %s , Your age is %d",names,ages)
console.log(`Hello ${names} , Your age is ${ages}`) // ES6



 // class

 class students{
     constructor()
     {
         this.nam = "Shubham Khunt"
         this.umar = 19
         console.log("Constructor initialization complete !!")
     }
    getNam()
    {
        return this.nam;
    }
    getUmara()
    {
        return this.umar;
    }   
 }
 var stuobj = new students();

 console.log(stuobj.getNam())
 console.log(stuobj.getUmara())



