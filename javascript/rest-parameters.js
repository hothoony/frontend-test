// Rest parameters (...args)

function sum(...args) {
    let total = 0;
    for (const value of args) {
        total += value;
    }
    return total;
}

console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4, 5));
