const previousObj = {
    name: 'crong',
    lastTime: '11:20',
}

const currObj = Object.assign({}, previousObj, {
    lastTime: '13:10',
    age: 10,
});

console.log('previousObj', previousObj);
console.log('currObj', currObj);
