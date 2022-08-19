const fs = require('fs');

fs.rename('writeMe.txt', 'writenew.txt',function(err){
    if(err)
        console.log("Error in renaming")
    else   
        console.log("Renamed successfully")
})