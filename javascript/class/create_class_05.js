class Animal {

    constructor(name) {
        this.name = name;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
    
    bark() {
        return '동물이 짖다';
    }
}

class Dog extends Animal {
    bark() {
        return '멍멍';
    }
}

class Cat extends Animal {
    bark() {
        return '야옹';
    }
}

// -------------------------------------

let dog = new Dog();
dog.setName('snoopy');

let cat = new Cat();
cat.setName('tom');

console.log(dog.getName());
console.log(dog.name);
console.log(dog.bark());
console.log('');

console.log(cat.getName());
console.log(cat.name);
console.log(cat.bark());
console.log('');

dog.name = 'not snoopy';
console.log(dog.name);
