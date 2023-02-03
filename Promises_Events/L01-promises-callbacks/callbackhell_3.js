function one() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Running one'))           
        }, 1000)
    })
}
function two() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Running two'))
        }, 2000)
    })
}
function three() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Running three'))
        }, 4000)
    })
}
function four() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Running four'))
        }, 1999)
    })
}


const doAllTasks = async () => {
    var res1 = await one()
    var res2 = await two()
    var res3 = await three()
    var res4 = await four()
    
    return [res1, res2, res3, res4]
}

doAllTasks()
.then(result => console.log('Success '+ result))
.catch(err=>console.log("Something went wrong" + err))