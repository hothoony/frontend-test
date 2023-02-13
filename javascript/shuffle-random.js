function randomBetween(start, end) {
    return parseInt((Math.random() * (end - start + 1)) + start);
}

function shuffle(list) {
    for (let i = 0; i < list.length; i++) {
        let x = randomBetween(0, list.length - 1);
        let y = randomBetween(0, list.length - 1);
        let temp = list[x];
        list[x] = list[y];
        list[y] = temp;
    }
}

let ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(ary);
shuffle(ary);
console.log(ary);
