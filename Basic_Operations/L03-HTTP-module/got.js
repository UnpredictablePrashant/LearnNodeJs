//npm install got@11.8.3


const got = require('got')
got.get('http://localhost:3002/data', {responseType: 'json'})
.then(res => {
    console.log(res.body)
}).catch(err => {
    console.log(err)
})

/*
The got error "[ERR_REQUIRE_ESM]: require() not supported" occurs because the got package has been converted to be an ESM only package in version 12, which means that the package cannot be imported with require() anymore.
To solve the got error "[ERR_REQUIRE_ESM]: require() not supported", downgrade the version of the package to 11.8.3 by running the following command: npm install got@11.8.3. This is the last version of got that is built with CommonJS.

*/

// https://blog.logrocket.com/commonjs-vs-es-modules-node-js/