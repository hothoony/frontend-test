function Animal() {

    this.name;

    this.setName = function(name) {
        this.name = name;
    }

    this.getName = function() {
        return this.name;
    }

    this.bark = function() {
        return '동물이 짖다';
    }
}

// -------------------------------------

let dog = new Animal();
dog.setName('snoopy');

let cat = new Animal();
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
