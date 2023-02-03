const isdooropen = false
const kidsplayingout = false

function runOutsideToPlay(){
    return new Promise((resolve, reject)=>{
        if(isdooropen){
            reject({
                thinking: "Should I go out?",
                action: 'Run out of the home'
            })
        }else if(kidsplayingout){
            reject({
                thinking: 'I want to play with those kids.',
                action: 'Try to go out'
            })
        }else{
            resolve('Cant go')
        }
    })
    
}

runOutsideToPlay().then(message => {
    console.log('Success: '+message)
}).catch((error)=>{
    console.log(error.thinking + ' ' + error.action)
})