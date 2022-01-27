var Animal = {
    name: '',
    bark() {
        return '동물이 짖다';
    }
};

var dog = Animal;
console.log(dog.bark());
