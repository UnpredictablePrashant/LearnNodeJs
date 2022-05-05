
// Require the given module
var fs = require('fs');
 
// Use readFileSync() method
 
// Store the result (return value) of this
// method in a variable named readMe
 
// Keep the file in the same folder so
// donot need to specify the complete path
var readMe = fs.readFileSync('readme.txt', 'utf-8');
 
// log the content of file stored in
// a variable to screen
console.log(readMe);