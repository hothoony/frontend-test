const users = [
    { name: "Tom", age: 17 },
    { name: "Alice", age: 21 },
    { name: "Bob", age: 19 },
    { name: "Paul", age: 20 },
    { name: "John", age: 23 },
];

// original
console.log('');
users.forEach(user => console.log(user));

let result;

// filter
console.log('');
result = users.filter(u => u.age >= 20);
result.forEach(user => console.log(user));

// sort
console.log('');
result = users.sort((u1, u2) => u1.age - u2.age); // asc
result.forEach(user => console.log(user));

// sort
console.log('');
result = users.sort((u1, u2) => u2.age - u1.age); // desc
result.forEach(user => console.log(user));
