const fs = require('fs');

fs.unlink('writeMe.txt', function(err){
    if(err)
        console.log("Error in deleting")
    else   
        console.log("Deleted successfully")
})