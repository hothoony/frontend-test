let data = [
    {name: 'john', age: 10},
    {name: 'steve', age: 20},
    {name: 'paul', age: 30},
];

// for in
console.log('');
for (const item in data) {
    console.log(data[item]);
}

// for of
console.log('');
for (const item of data) {
    console.log(item);
}
