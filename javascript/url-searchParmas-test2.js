
const url1 = new URL('https://my.site.com:8080/users/4/detail?page=1&size=10');
const url2 = new URL('https://my.site.com:8080/users/4/detail');

console.log('url2 의 searchParams 를 url1 로 복사');

console.log('');
console.log('url1 page =', url1.searchParams.get('page'));
console.log('url1 size =', url1.searchParams.get('size'));

url2.searchParams.set('page', 3);
url2.searchParams.set('size', 15);

console.log('');
console.log('url2 page =', url2.searchParams.get('page'));
console.log('url2 size =', url2.searchParams.get('size'));

// 동작 X
// url1.searchParams = url2.searchParams;

// OK
// url1.searchParams.set('page', url2.searchParams.get('page'));
// url1.searchParams.set('size', url2.searchParams.get('size'));

// OK
const searchParams2 = url2.searchParams;
url1.searchParams.set('page', searchParams2.get('page'));
url1.searchParams.set('size', searchParams2.get('size'));

console.log('');
console.log('url1 page =', url1.searchParams.get('page'));
console.log('url1 size =', url1.searchParams.get('size'));
console.log('url2 page =', url2.searchParams.get('page'));
console.log('url2 size =', url2.searchParams.get('size'));
