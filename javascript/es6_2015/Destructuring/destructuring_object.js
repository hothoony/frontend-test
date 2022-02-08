let obj = {
    name: 'steve',
    address: 'Korea',
    age: 20
}

// name, age 를 출력
let {name, age} = obj;
console.log(name, age);

// 다른 이름으로 출력
let {name: myName, age: myAge} = obj;
console.log(myName, myAge);
