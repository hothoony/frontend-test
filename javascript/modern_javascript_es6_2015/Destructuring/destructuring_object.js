const person1 = {
    name: 'james',
    age: 20,
    address: {
        city: 'seoul',
        street: 'mapo'
    }
}

const person2 = {
    name: 'steve',
    age: 22
}

// name, age 를 출력
var { name, age } = person1;
console.log();
console.log(name, age);

// 다른 이름으로 출력
var { name: myName, age: myAge } = person2;
console.log();
console.log(myName, myAge);

// default value
var { name, age, country: myCountry = 'korea' } = person2;
console.log();
console.log(name, age, myCountry);

// object 합치기
var newPerson = { ...person1, ...person2 };
console.log();
console.log(newPerson);

// address 오브젝트를 destructuring
var { address: { city, street } } = person1;
console.log();
console.log(city, street);

// rest
var { name, ...rest } = person1;
console.log();
console.log(name);
console.log(rest);
