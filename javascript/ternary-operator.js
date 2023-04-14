// 삼항 연산자, ternary operator

const buyTypeNm = (buyType) => {
    return (buyType === 'free') ? '무료'
         : (buyType === 'pay') ? '유료'
         : (buyType === 'my') ? '내꺼'
         : 'no match';
}

console.log(buyTypeNm('free'));
console.log(buyTypeNm('pay'));
console.log(buyTypeNm('my'));
console.log(buyTypeNm('noValue'));
