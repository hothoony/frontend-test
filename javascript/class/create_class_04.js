var Animal = (function() {

    this.name;
    
    function Animal() {
    }

    Animal.prototype.setName = function(name) {
        this.name = name;
    }

    Animal.prototype.getName = function() {
        return this.name;
    }

    Animal.prototype.bark = function() {
        return '동물이 짖다';
    }

    return Animal;

})();

var Dog = (function() {

    function Dog() {
    }

    Dog.prototype = new Animal();

    Dog.prototype.bark = function() {
        return '멍멍';
    }

    return Dog;

})();

var Cat = (function() {

    function Cat() {

    }

    Cat.prototype = new Animal();

    Cat.prototype.bark = function() {
        return '야옹';
    }

    return Cat;

})();

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
