
const list = [
    null, // false
    undefined, // false
    8080,
    -1,
    0, // false
    1,
    2,
];

list.forEach(item => {
    const port = item || 3000;
    console.log('');
    console.log('item =', item);
    console.log('port =', port);
});
