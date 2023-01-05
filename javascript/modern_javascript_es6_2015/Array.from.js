// arguments
function addMark1() {
    let result = [];
    for (let arg of arguments) {
        result.push(arg);
    }
    return result;
}

// Array.from
function addMark2() {
    // Array.from 가짜 배열 arguments 를 배열로 변환
    let ary = Array.from(arguments);
    let result = ary.map(function(value) {
        return value + "!";
    });
    return result;
}

console.log('addMark1', addMark1(1, 2, 3, 4, 5));
console.log('addMark2', addMark2(1, 2, 3, 4, 5));
