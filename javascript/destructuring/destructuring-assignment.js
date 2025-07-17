let a, b, rest;
[a, b] = [10, 20];
console.log([a, b], ', type =', toString.call([a, b]));   // (2) [10, 20] , type = [object Array]
console.log([a], ', type =', toString.call([a]));         // (1) [10] , type = [object Array]
console.log([b], ', type =', toString.call([b]));         // (1) [20] , type = [object Array]
console.log(a, ', type =', toString.call(a));             // 10 , type = [object Number]
console.log(b, ', type =', toString.call(b));             // 20 , type = [object Number]

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest, ', type =', toString.call(rest));       // (3) [30, 40, 50] , type = [object Array]
