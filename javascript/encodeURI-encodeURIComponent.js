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


//          encodeURI url1 = http://www.googl.com:80/login?redirect=/search?keyword=%EC%98%81%EC%96%B4%2520%EB%B2%88%EC%97%AD&type=title
// encodeURIComponent url1 = http%3A%2F%2Fwww.googl.com%3A80%2Flogin%3Fredirect%3D%2Fsearch%3Fkeyword%3D%EC%98%81%EC%96%B4%2520%EB%B2%88%EC%97%AD%26type%3Dtitle

//          encodeURI url2 = /login?redirect=/search?keyword=%EC%98%81%EC%96%B4%2520%EB%B2%88%EC%97%AD&type=title
// encodeURIComponent url2 = %2Flogin%3Fredirect%3D%2Fsearch%3Fkeyword%3D%EC%98%81%EC%96%B4%2520%EB%B2%88%EC%97%AD%26type%3Dtitle

// URL 전체를 인코딩할 때는 encodeURI 를 사용하고, 
// 쿼리 문자열의 개별 값을 인코딩할 때는 encodeURIComponent 를 사용하는 것이 일반적입니다.
