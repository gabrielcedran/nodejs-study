
const wait = (time, callback) => {
    setTimeout(() => {
        callback()
    }, time)
}

// this leads to callback hell

wait(1000, () => {
    console.log("1s has passed");
    wait(2000, () => {
        console.log("now 3s have passed");

        wait(2000, () => {
            console.log("now 5s have passed")
        })
    })
})

// callbacks is what made non blocking possible, however 
// it led to issues like the famous callback hell.
// Promises to the rescue.

const wait2 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

wait2(1000)
.then(() => {
    console.log("1s has passed");
    return wait2(2000);
})
.then(() => {
    console.log("now 3s have passed");
    return wait2(2000);
})
.then(() => {
    console.log("now 5s have passed");
});

// With promises, we are ever one level deep into the processing chain
// It'd be even better if we could keep things as though they were blocking - await / async to the rescue

await wait2(1000)
console.log("1s has passed");
await wait2(2000)
console.log("now 3s have passed");
await wait2(2000)
console.log("now 5s have passed");

// ps in nodejs, unlike on browser, it's not necessary to have an async function in order to use await
// because it's assume there is something called async in the global space.