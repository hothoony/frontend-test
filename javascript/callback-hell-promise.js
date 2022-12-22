function step1() {
    console.log('step1 processing');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step1 processing done');
            resolve();
        }, 1000);
    });
}

function step2() {
    console.log('step2 processing');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step2 processing done');
            resolve();
        }, 1000);
    });
}

function step3() {
    console.log('step3 processing');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step3 processing done');
        }, 1000);
    });
}

// -----------------------------------------

step1()
.then(() => {
    return step2();
})
.then(() => {
    return step3();
});
