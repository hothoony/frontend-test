function Animal() {
    this.name;
}
Animal.prototype.setName = function(name) {
    this.name = name;
}
Animal.prototype.getName = function() {
    return this.name;
}

let dog = new Animal();
dog.setName('snoopy');

let cat = new Animal();
cat.setName('tom');

console.log(dog.getName());
console.log(cat.getName());
console.log(dog.name);
console.log(cat.name);
