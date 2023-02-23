const url1 = 'http://www.googl.com:80/login?redirect=/search?keyword=영어%20번역&type=title';
const url2 = '/login?redirect=/search?keyword=영어%20번역&type=title';

console.log('');
console.log('                   url1 =', url1);
console.log('                   url2 =', url2);

console.log('');
console.log('         encodeURI url1 =', encodeURI(url1));
console.log('encodeURIComponent url1 =', encodeURIComponent(url1));

console.log('');
console.log('         encodeURI url2 =', encodeURI(url2));
console.log('encodeURIComponent url2 =', encodeURIComponent(url2));
