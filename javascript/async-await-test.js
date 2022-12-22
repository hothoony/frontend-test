async function stepSuccess() {
    console.log('stepSuccess');
    let promise1 = new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('success');
        }, 1000);
    });
    let result = await promise1;
    console.log('stepSuccess result', result);
}

async function stepFail() {
    console.log('stepFail');
    let promise2 = new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('fail');
        }, 2000);
    });
    let result = await promise2;
    console.log('stepFail result', result);
}

stepSuccess();
stepFail();
