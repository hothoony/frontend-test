// argument 에 사용
function sum(...args) {
    let s = 0;
    for (let v of args) {
        s += v;
    }
    return s;
}

let pre = [10, 20, 30];

/*
    sum.apply(null, pre) 를 실행하면
    sum(10, 20, 30) 으로 실행됨
*/
// apply 사용
console.log(sum.apply(null, pre));

// parameter 에 사용
console.log(sum(...pre));
