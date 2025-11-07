const target = {
    message1: 'hello',
    message2: 'world',
};

const handler1 = {};

const proxy1 = new Proxy(target, handler1);

console.log(proxy1.message1);
console.log(proxy1.message2);

const handler2 = {
    get(target, prop, receiver) {
        return 'hello2';
    },
};

const proxy2 = new Proxy(target, handler2);

console.log(proxy2.message1);
console.log(proxy2.message2);
