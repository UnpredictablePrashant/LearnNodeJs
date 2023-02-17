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

one()
.then(console.log('one is done'))
.then(two())
.then(console.log('two is done'))
.then(three())
.then(console.log('three is done'))
.then(four())
.then(console.log('four is done'))
.catch(console.log("Something went wrong"))
