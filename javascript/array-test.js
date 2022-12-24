function printAry(ary) {
    ary.forEach(item => {
        console.log(item);
    });
}

let ary = [
    {name: 'aa', score: 11},
    {name: 'bb', score: 22},
    {name: 'cc', score: 33},
    {name: 'dd', score: 44},
    {name: 'ee', score: 55},
];
let result;

console.log('');
console.log('forEach');
printAry(ary);

result = ary.filter(item => {
    return item.score % 2 == 0;
});
console.log('');
console.log('filter');
printAry(result);

result = ary.map(item => {
    return item.score;
});
console.log('');
console.log('map');
printAry(result);

result = ary.flatMap(item => {
    return [item.name, item.score];
});
console.log('');
console.log('flatMap');
printAry(result);

console.log('');
console.log('include');
console.log([11, 22, 33].includes(22));
console.log([11, 22, 33].includes(44));
