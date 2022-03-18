let result0 = Math.max(2, 1, 3);                 // 함수 기본 호출
let result1 = Math.max.call(null, 2, 1, 3);      // call, 파라미터로 전달
let result2 = Math.max.apply(null, [2, 1, 3]);   // apply, 배열로 전달
let bindResult1 = Math.max.bind(null, 2, 1, 3);      // bind, 함수가 실행되지 않고 함수 자체를 리턴
let bindResult2 = Math.max.bind(null);      // bind, 함수가 실행되지 않고 함수 자체를 리턴

console.log('basic result  :', result0);
console.log(' call result  :', result1);
console.log('apply result  :', result2);
console.log(' bindResult1  :', bindResult1);
console.log(' bindResult2  :', bindResult2);
console.log(' bindResult1()A :', bindResult1());
console.log(' bindResult1()B :', bindResult1(2, 3, 4));
console.log(' bindResult2()A :', bindResult2());
console.log(' bindResult2()B :', bindResult2(2, 3, 4));
