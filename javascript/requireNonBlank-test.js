function isBlank(str) {
    if (str == null || str == undefined || str == '' || str.trim() == '') {
        return true;
    }
    return false;
}

function isBlank2(str) {
    return !str?.trim();
}

function requireNonBlankElse(str, value = 'value is blank') {
    if (isBlank(str)) {
        return value;
    }
    return str;
}

function test1() {
    console.log('');
    console.log(requireNonBlankElse(undefined));
    console.log(requireNonBlankElse(null));
    console.log(requireNonBlankElse(''));
    console.log(requireNonBlankElse(' '));
}

function test2() {
    console.log('');
    console.log(requireNonBlankElse(undefined, '-'));
    console.log(requireNonBlankElse(null, '-'));
    console.log(requireNonBlankElse('', '-'));
    console.log(requireNonBlankElse(' ', '-'));
}

test1();
test2();
