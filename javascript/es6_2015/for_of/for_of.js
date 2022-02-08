let list = ['apple', 'mac', 'iphon'];
for (let item in list) {
    console.log(item, list[item]);
}
console.log('');
for (let item of list) {
    console.log(item, list[item]);
}
console.log('');


list = [
    {id: '1a', name: 'apple'},
    {id: '2b', name: 'mac'},
    {id: '3c', name: 'iphon'},
];
for (let item in list) {
    console.log(item, list[item]);
}
console.log('');
for (let item of list) {
    console.log(item, list[item], item.id, item.name);
}
console.log('');
