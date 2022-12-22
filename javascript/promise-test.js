let promise1 = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('success');
    }, 1000);
});
promise1.then(message => {
    console.log('success', message);
})
.catch(message => {
    console.log('fail', message);
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(function() {
        reject('error !!');
    }, 2000);
});
promise2.then(message => {
    console.log('success', message);
})
.catch(message => {
    console.log('fail', message);
});
