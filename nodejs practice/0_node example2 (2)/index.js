var rect = require('./rectangle');

function solveRect(l,b){
    console.log("Solving for rectangle with l = "+l+" and "+"b = "+b)
    if(l <= 0 || b <=0 )
    {
        console.log("Rectangle dimension should be greterthan zero")
    }
    else{
        console.log("The area of rectangle is "+rect.area(l,b))
        console.log("The perimeter of rectangle is "+rect.perimeter(l,b))

    }
}

solveRect(2,4)
solveRect(4,9)