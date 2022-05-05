// npm install node-fetch@2
const nodefetch = require('node-fetch')

async function fetchData(){
    try{
        const res = await nodefetch('http://localhost:3002/data')
        // console.log(res.status)
        const d = await res.json()
        console.log(d)
    }
    catch(err) {
        console.log(err)
    }
}

fetchData()