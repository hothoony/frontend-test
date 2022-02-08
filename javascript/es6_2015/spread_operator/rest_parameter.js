function sum(...args) {
    let result = 0;
    for (let num of args) {
        result += num;
    }
    return result;
}

console.log(sum(1));
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));
console.log(sum(1, 2, 3, 4, 5));
