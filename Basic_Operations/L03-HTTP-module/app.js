const http = require('http');

http.get('http://localhost:3002/data', res => {
    let stu = [];
    res.on('data', chunk => {
        stu.push(chunk);
    })

    res.on('end', () => {
        console.log('end');
        const student = JSON.parse(Buffer.concat(stu).toString());
        console.log(student)
    })

}).on('error',err => {
    console.log("Error")
})



  