function one(callback){
    setTimeout(()=>{
        console.log('Running one')
        callback()
    }, 1000)
}
function two(callback){
    setTimeout(()=>{
        console.log('Running two')
        callback()
    }, 2000)
}
function three(callback){
    setTimeout(()=>{
        console.log('Running three')
        callback()
    }, 4000)
}
function four(callback){
    setTimeout(()=>{
        console.log('Running four')
        callback()
    }, 1999)
}

one(()=>{
    console.log('one is done')
    two(()=>{
        console.log('two is done')
        three(()=>{
            console.log('three is done')
            four(()=>{
                console.log('four is done')
            })
        })
    })

})