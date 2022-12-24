function step1() {
    console.log('step1 begin');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step1 end');
            resolve();
        }, 1000);
    });
}

function step2() {
    console.log('step2 begin');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step2 end');
            resolve();
        }, 1000);
    });
}

function step3() {
    console.log('step3 begin');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step3 end');
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
