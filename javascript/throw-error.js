function throwTest1() {
    try {
        // 메시지만 던진다
        throw 'err occured';
    } catch (e) {
        console.error(e);
    }
}

function throwTest2() {
    try {
        // 메시지를 Error 객체에 담아서 던진다
        throw new Error('err occured');
    } catch (e) {
        console.error(e.message);
        console.error(e);
    }
}

console.log('');
throwTest1();

console.log('');
throwTest2();
