const url = require('url');
let q = url.parse('http://localhost:3002/data?name=prashant&age=26', true).query

console.log(q.name)
console.log(q.age)