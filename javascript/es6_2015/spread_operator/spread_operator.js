// ... => spread operator
let pre = ["apple", "orange", 100];
let newData = [...pre]; // 메모리에 새로운 배열을 할당
console.log('pre', pre);
console.log('newData', newData);
console.log(pre == newData);
console.log(pre === newData);
