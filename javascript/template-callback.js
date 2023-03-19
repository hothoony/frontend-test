const template = (callback = null) => {
    try {
        console.log('db conn 생성');
        console.log('query 실행');
        
        if (callback) callback();

        console.log('커밋');
    } catch (e) {
        console.log('롤백');
    } finally {
        console.log('db conn 릴리즈');
    }
}

const service = (param1, param2) => {
    console.log('==> service 실행', param1, param2);
}

console.log('');
console.log('------------------ service 실행 안됨');
template();

console.log('');
console.log('------------------ service 가 먼저 실행됨');
template(service());

console.log('');
console.log('------------------ param 전달 안됨');
template(service);

console.log('');
console.log('------------------ 정상 실행');
template(() => service('aa', 11));
