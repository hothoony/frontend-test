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

// 비동기 처리를 하는 함수에서 Promise 를 리턴한다
// 비동기 처리 함수를 호출할때 await 를 적어준다
// await 구문을 사용하는 함수에 async 를 적어준다

async function successAll() {
    try {
        await step1();
        await step2();
        await step3();
    } catch (e) {
        console.log('error', e);
    } finally {
        console.log('finally');
    }
}
async function failTest() {
    try {
        await step1();
        await step2(false);
        await step3();
    } catch (e) {
        console.log('catch', e);
    } finally {
        console.log('finally');
    }
}

// successAll();
failTest();
