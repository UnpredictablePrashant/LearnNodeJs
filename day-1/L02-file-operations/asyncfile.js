
// Require the given module
var fs = require('fs');
  

fs.readFile('readme.txt', 'utf-8', function(err, data){
    console.log(data)
})

// Use readFile() method
fs.readFile('readme.txt', 'utf-8', function(err, data) {
  
    // Write the data read from readeMe.txt
    // to a file writeMe.txt
    if( !err )
        fs.writeFile('writeMe.txt', data, (err)=>{
            if( err ) {
                throw err;
            }
        });
    else
        throw err;
});