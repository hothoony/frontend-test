function fn() {
    const list = ['red', 'green', 'blue'];
    console.log('list', list);
    list.push('black'); // 배열에 값이 추가된다
    console.log('list', list);
}
fn();

// fruits 배열을 변경하지 않고
// fruits2 배열을 새로 생성
const fruits = ['apple', 'melon', 'lemon'];
const fruits2 = [].concat(fruits, 'jamon');
console.log('fruits', fruits);
console.log('fruits2', fruits2);
