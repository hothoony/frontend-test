function step1(callback) {
    console.log('step1 processing');
    setTimeout(() => {
        callback();
    }, 1000);
}

function step2(callback) {
    console.log('step2 processing');
    setTimeout(() => {
        callback();
    }, 1000);
}

function step3(callback) {
    console.log('step3 processing');
    setTimeout(() => {
        callback();
    }, 1000);
}

// -----------------------------------------

let myPromise = new Promise((resolve, reject) => {
    // setTimeout(function() {
    //     resolve('success');
    // }, 1000);
    setTimeout(function() {
        reject('error !!');
    }, 2000);
});
myPromise
.then(message => {
    console.log('success', message);
})
.catch(message => {
    console.log('fail', message);
});
