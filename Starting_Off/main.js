const http = require('http')

let studentData = [
    {
        id:01,
        name:"Alex",
        marks: 82
    },
    {
        id:02,
        name:"John",
        marks: 88
    }
]

http.createServer((req, res) => {
    if(req.url === '/data' && req.method === "GET"){
        // res.writeHead(200, {'Content-Type':'text/html'});
        res.writeHead(200, {'Content-Type':'application/json'});
        res.write(JSON.stringify(studentData));
        res.end()
    }
    
}).listen(3002)
console.log("Server started on http://localhost:3002")
// https://zetcode.com/javascript/http/