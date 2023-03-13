const href = 'https://my.site.com:8080/users/4/detail?page=1&size=10&keyword=ko_KR';
const url = new URL(href);

console.log('');
console.log('href =', href);

console.log('');
console.log('url =', url);
console.log('url.href =', url.href);
console.log('url.searchParams =', url.searchParams);

console.log('');
console.log('--------------------------- url 속성 출력');
console.log('protocol =', url.protocol);
console.log('hostname =', url.hostname);
console.log('port     =', url.port);
console.log('host     =', url.host);
console.log('origin   =', url.origin);
console.log('pathname =', url.pathname);
console.log('search   =', url.search);

console.log('');
console.log('--------------------------- searchParams 파라미터 출력');
console.log('searchParams page    =', url.searchParams.get('page'));
console.log('searchParams size    =', url.searchParams.get('size'));
console.log('searchParams keyword =', url.searchParams.get('keyword'));

console.log('');
console.log('--------------------------- searchParams 파라미터 변경');
url.searchParams.set('page', 3);
url.searchParams.set('size', 15);
url.searchParams.set('keyword', 'en_US');

console.log('searchParams page    =', url.searchParams.get('page'));
console.log('searchParams size    =', url.searchParams.get('size'));
console.log('searchParams keyword =', url.searchParams.get('keyword'));

console.log('');
console.log('--------------------------- url.href 출력');
console.log('url.href =', url.href);
