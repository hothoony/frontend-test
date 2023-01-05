let list = ['apple', 'orange', 'banana', 'strawberry'];
console.log('');
console.log('list', list);

let result = list.filter(function(elem) {
    return elem.includes('b');
});
console.log('');
console.log('result filtered', result);
