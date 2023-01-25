// ... => sary1ad operator
let ary1 = ["apple", "orange", 100];

let ary2 = [
    ...ary1,
    'aa',
    22,
]; // 메모리에 새로운 배열을 할당

let ary3 = [
    'aa',
    22,
    ...ary1,
];

console.log('ary1', ary1);
console.log('ary2', ary2);
console.log('ary3', ary3);
