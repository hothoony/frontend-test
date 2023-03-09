const str = 'aa@bb.com';

// base64 인코딩
const base64Encoded = btoa(str);

// base64 디코딩
const base64Decoded = atob(base64Encoded);

console.log('          str =', str);
console.log('base64Encoded =', base64Encoded);
console.log('base64Decoded =', base64Decoded);
