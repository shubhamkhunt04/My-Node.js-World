var rect = require('./rectangle');

function solveRect(l,b){
    console.log("Solving for rectangle with l = "+l+" and "+"b = "+b)
    rect(l,b,(err,rectangle)=>{
        if(err){
            console.log("ERROR: ",err.message)
        }
        else
        {
            console.log("The area of the rectangle is "+rectangle.area())
            console.log("The perimeter of the rectangle is "+rectangle.perimeter())
        }
    })

    console.log("This statement is after the call to rect()")
}

solveRect(2,4)
solveRect(4,9)