function isBlank(str) {
    if (str == null || str == undefined || str == '' || str.trim() == '') {
        return true;
    }
    return false;
}

function isBlank2(str) {
    return !str?.trim();
}

function test1() {
    console.log('');
    console.log(isBlank(null));
    console.log(isBlank(undefined));
    console.log(isBlank(''));
    console.log(isBlank(' '));
}

function test2() {
    console.log('');
    console.log(isBlank2(null));
    console.log(isBlank2(undefined));
    console.log(isBlank2(''));
    console.log(isBlank2(' '));
}

test1();
test2();
