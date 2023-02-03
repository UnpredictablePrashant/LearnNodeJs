const isdooropen = false
const kidsplayingout = true

function runOutsideToPlay(callback, errorcallback){
    if(isdooropen){
        errorcallback({
            thinking: "Should I go out?",
            action: 'Run out of the home'
        })
    }else if(kidsplayingout){
        errorcallback({
            thinking: 'I want to play with those kids.',
            action: 'Try to go out'
        })
    }else{
        callback('Cant go')
    }
}

runOutsideToPlay(message => {
    console.log('Success: '+message)
},(error)=>{
    console.log(error.thinking + ' ' + error.action)
})