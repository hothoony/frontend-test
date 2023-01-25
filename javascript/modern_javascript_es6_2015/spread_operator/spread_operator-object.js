// ... => sobj1ad operator

let obj1 = {
    name: 'paul',
    age: 20,
    isMale: true,
}

let obj2 = {
    ...obj1,
    name: 'chris',
    isMale: false,
    score: 95,
}; // 메모리에 새로운 배열을 할당

let obj3 = {
    name: 'chris',
    isMale: false,
    score: 95,
    ...obj1,
};

console.log('obj1', obj1);
console.log('obj2', obj2);
console.log('obj3', obj3);
