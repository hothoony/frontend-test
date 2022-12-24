function step1(success = true) {
    console.log('step1 begin');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                console.log('step1 end');
                resolve();
            } else {
                reject(new Error('fail step1'));
            }
        }, 1000);
    });
}

function step2(success = true) {
    console.log('step2 begin');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                console.log('step2 end');
                resolve();
            } else {
                reject(new Error('fail step2'));
            }
        }, 1000);
    });
}

function step3(success = true) {
    console.log('step3 begin');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                console.log('step3 end');
                resolve();
            } else {
                reject(new Error('fail step3'));
            }
        }, 1000);
    });
}

// -----------------------------------------

function successAll() {
    step1()
    .then(() => {
        return step2();
    })
    .then(() => {
        return step3();
    })
    .catch(e => {
        console.log('catch', e);
    });
}

function failTest() {
    step1()
    .then(() => {
        return step2(false);
    })
    .then(() => {
        return step3();
    })
    .catch(e => {
        console.log('catch', e);
    });
}

// successAll();
failTest();
