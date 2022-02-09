// WeakSet1
// 참조를 가지고 있는 객체만 저장 가능

let arr = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
let obj = {arr, arr2};
let ws = new WeakSet();

ws.add(arr);
ws.add(arr2);
ws.add(obj);

console.log();
console.log(ws);
console.log(ws.has(arr));
console.log(ws.has(arr2));
console.log(ws.has(obj));

arr = null;
arr2 = null;

console.log();
console.log(ws);
console.log(ws.has(arr));
console.log(ws.has(arr2));
console.log(ws.has(obj));
