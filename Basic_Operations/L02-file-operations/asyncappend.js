const fs = require('fs');

let data = "appending some new data"

fs.appendFile('readme.txt', data, function(err){
    if(err)
        console.log("ERROR in appending");
    else
        console.log("Data appended");
})