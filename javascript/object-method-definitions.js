const user = {

    name: 'john',

    say: function() {
        return 'say';
    },

    walk: () => {
        return 'walk';
    },

    hello() {
        return 'hello';
    },
};

console.log(user.name);
console.log(user.say());
console.log(user.walk());
console.log(user.hello());
