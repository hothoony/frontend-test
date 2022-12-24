// getter, setter

const user = {
    username: 'john',

    setUsername(name) {
        this.username = name;
    },

    getUsername() {
        return this.username;
    },

    // setter
    set name(name) {
        this.username = name;
    },

    // getter
    get name() {
        return this.username;
    },

};

console.log('');
console.log(user.username);

console.log('');
user.setUsername('paul');
console.log('user.getUsername =', user.getUsername());
console.log('user.username =', user.username);

console.log('');
user.name = 'steve'; // using setter
console.log('user.name =', user.name); // using getter
console.log('user.username =', user.username);
