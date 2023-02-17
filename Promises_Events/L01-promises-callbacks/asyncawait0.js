async function f() {
    return 1;
}

f().then(msg => console.log(msg)); 


// Same as the above one

async function f2() {
    return Promise.resolve(1);
}

f2().then(msg => console.log(msg));

// await waits untill the promise settles and returns its result
async function f3() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 3000)
    });

    let result = await promise; // wait until the promise resolves (*)

    console.log(result); // "done!"
    console.log("Hi")
}

f3();

// Note: You can't use await in a synchronous function