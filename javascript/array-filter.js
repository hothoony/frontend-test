const data = [
    {name: 'john', age: 10},
    {name: 'steve', age: 20},
    {name: 'paul', age: 30},
];

const filteredData = (data) => {
    return data.filter(item => {
        return item.name != 'steve';
    });
}

console.log('');
console.log('-----------filter 전');
for (let item of data) {
    console.log(item);
}

console.log('');
console.log('-----------filter 후');
for (let item of filteredData(data)) {
    console.log(item);
}
