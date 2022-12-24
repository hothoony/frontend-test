// Nullish coalescing assignment (??=)
// nullish (null or undefined) 일 때만 값을 할당한다

const data = {
    scoreA: '100',
    scoreB: null,
    scoreC: undefined,
};

data.scoreA ??= '-1';
data.scoreB ??= '-1';
data.scoreC ??= '-1';

console.log('scoreA =', data.scoreA);
console.log('scoreB =', data.scoreB);
console.log('scoreC =', data.scoreC);
