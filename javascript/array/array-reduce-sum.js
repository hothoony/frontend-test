const data = [
    {name: 'john', score: 10},
    {name: 'steve', score: 20},
    {name: 'paul', score: 30},
];

for (let item of data) {
    console.log(item);
}

let sum = data.reduce((totalSum, nextItem) => {
    console.log('');
    console.log('totalSum', totalSum);
    console.log('nextItem', nextItem);
    return totalSum + nextItem.score;
}, 0);
console.log('');
console.log('sum =', sum);
