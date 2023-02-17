const val = new Promise((resolve,reject)=>{
    let a=1,b=3
    if(a+b==2){
        resolve("Success")
    }else{
        reject("Failed")
    }
})

val
.then(data => console.log("This worked "+data))
.catch(err => console.log("This didn't worked "+err))

const valfun = () => {
    return new Promise((resolve,reject)=>{
        let a=1,b=1
        if(a+b==2){
            resolve("Working")
        }else{
            reject("Not working")
        }
    })
}

valfun()
.then(data => console.log("This worked "+data))
.catch(err => console.log("This worked "+err))