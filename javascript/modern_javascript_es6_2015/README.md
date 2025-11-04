# Modern Javascript 정리

### let, const
```javascript
```

### Arrow Function
```javascript
const add = (a, b) => a + b;
```

### Default Parameter
```javascript
function greet(name = 'Guest') {
    console.log(`Hello, ${name}`);
}
```

### Rest & Spread Operator `...`
```javascript
// Rest
function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}

// Spread
const arr = [1, 2, 3];
const copy = [...arr, 4, 5];
```

### Object Destructuring
```javascript
const user = {name: 'alice', age: 20};
const { name, age } = user;
```

### Array Destructuring
```javascript
const [first, second] = [10, 20];
```

### Object Property Shorthand
```javascript
const name = 'Tom';
const person = { name }; // { name: 'Tom' }
```

### Object Spread/Merge
```javascript
const base = {a: 1, b: 2};
const extra = {b: 3, c: 4};
const merged = {...base, ...extra};
```

### Template Literal
```javascript
const name = 'Sam';
console.log(`Hello, ${name}`);
```

### Array filter
```javascript
const users = [
    { name: "Tom", age: 17 },
    { name: "Alice", age: 21 },
    { name: "Bob", age: 19 },
    { name: "Paul", age: 20 },
    { name: "John", age: 23 },
];
```