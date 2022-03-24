const colors = ['red', 'blue', 'green'];
const fruits = ['apple', 'melon'];

// extract value
var c1 = colors[0];
var c2 = colors[1];
console.log();
console.log(c1, c2);

// destructuring
var [c1, , c3] = colors;
console.log();
console.log(c1, c3);

// default value
var [c1, c2, c3, c4 = 'Orange'] = colors;
console.log();
console.log(c1, c2, c3, c4);

var [c1, ...rest] = colors;
console.log();
console.log(c1);
console.log(rest);

// concat array
var newArray = colors.concat(fruits);
console.log();
console.log(newArray);

// concat array with destructuring
var newArray = [...colors, ...fruits];
console.log();
console.log(newArray);
