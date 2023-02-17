function one(){
    setTimeout(()=>console.log('Running one'), 1000)
}
function two(){
    setTimeout(()=>console.log('Running two'), 2000)
}
function three(){
    setTimeout(()=>console.log('Running three'), 4000)
}
function four(){
    setTimeout(()=>console.log('Running four'), 1999)
}

one()
console.log('1')
two()
console.log('2')
three()
console.log('3')
four()