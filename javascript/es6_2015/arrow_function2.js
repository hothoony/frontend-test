setTimeout(function() {
    console.log('do work~');
}, 1000);

setTimeout(() => {
    console.log('do work~2');
}, 1000);

let newArr = [1, 2, 3].map(function(value) {
    return value * 2;
});
console.log('newArr1', newArr);

newArr = [1, 2, 3].map((v) => (v * 2));
console.log('newArr2', newArr);

newArr = [1, 2, 3].map(v => v * 2);
console.log('newArr3', newArr);
