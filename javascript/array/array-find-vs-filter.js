const ary = [
    {key: 'email', value: 'apitest_001@test.com'},
    {key: 'firstName', value: 'api test 001 66'},
    {key: 'lastName', value: ''},
    {key: 'score', value: '98'},
    {key: 'userPhone', value: '010-2222-3333'},
    {key: 'userPhone', value: '82'},
];

console.log('');
console.log(ary);

let result;

console.log('');
console.log('## find 로 찾기 ----------------------------');
// find 는 첫번째로 찾은 아이템을 리턴

result = ary.find((item) => item.key === 'score');
console.log('');
console.log('result', result);
console.log('result.value', result.value);

result = ary.find((item) => item.key === 'userPhone');
console.log('');
console.log('result', result);
console.log('result.value', result.value);


console.log('');
console.log('## filter 로 찾기 ----------------------------');
// filter 는 찾은 아이템들을 배열로 리턴

result = ary.filter((item) => item.key === 'score');
console.log('');
console.log('result', result);
console.log('result.value', result.value);

result = ary.filter((item) => item.key === 'userPhone');
console.log('');
console.log('result', result);
console.log('result.value', result.value);
