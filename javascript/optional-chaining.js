// Optional chaining (?.)

// obj?.prop
// obj?.[prop]
// obj.method?.()

let user1 = {
    name: 'john',
    hello: () => `hello there?`,
};

let user2 = {};

console.log('');
console.log('# obj?.prop');
console.log('user1 name =', user1?.name);
console.log('user1 name =', user2?.name);

console.log('');
console.log('# obj?.[prop]');
console.log('user1 name =', user1?.['name']);
console.log('user1 name =', user2?.['name']);

console.log('');
console.log('# obj.method?.()');
console.log('user1 name =', user1.hello?.());
console.log('user1 name =', user2.hello?.());
