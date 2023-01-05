function sum(a, b={value:1}) {
    return a * b.value;
}
console.log(sum(2, {value: 10}));
console.log(sum(2));
