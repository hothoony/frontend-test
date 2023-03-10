const str = 'aa@bb.com';

// base64 인코딩
const base64Encoded = btoa(str);

// base64 디코딩
const base64Decoded = atob(base64Encoded);

console.log('          str =', str);
console.log('base64Encoded =', base64Encoded);
console.log('base64Decoded =', base64Decoded);


// --------------------------------------------------------
// TEST
// --------------------------------------------------------

const lpad = (str, len, padding = ' ') => {
    if (str === undefined || str === null) return null;
    while (String(str).length < len) {
        str = str + padding;
    }
    return str;
}

const list1 = [
    'test_001@test.com',
    'test_001',
    '111111',
    'anonymous_test_001@test.com',
    '01011112222',
    '01033334444',
];

const list2 = [
    'test_003@test.com',
    'test_003',
    '111111',
    'anonymous_test_003@test.com',
    '01011112222',
    '01033334444',
];

console.log('');
list1.map(item => {
    console.log(lpad(item, 30), '=', btoa(item));
});

console.log('');
list2.map(item => {
    console.log(lpad(item, 30), '=', btoa(item));
});
