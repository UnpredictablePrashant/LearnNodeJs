var request = require("request");
// url: 'https://api.github.com/users/UnpredictablePrashant',

function initialize() {
    return new Promise(function(resolve, reject) {
        request.get('http://localhost:3002/data', (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(res.body));
            }
        })
    })
}

function main() {
    var initializePromise = initialize();
    initializePromise.then(result => {
        console.log(result)
    }, err => {
        console.log(err);
    })
}

main();