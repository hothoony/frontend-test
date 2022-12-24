function tryCatchFinallyTest(throwError = false) {
    try {
        console.log('some job1');
        console.log('some job2');
        if (throwError) {
            throw new Error('에러 발생!');
        }
        console.log('some job3');
    } catch (e) {
        console.log('catch', e.message);
    } finally {
        console.log('finally');
    }
}

console.log('');
tryCatchFinallyTest();

console.log('');
tryCatchFinallyTest(true);
