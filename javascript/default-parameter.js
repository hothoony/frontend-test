function say(hello, world = 'world') {
    return hello + ' ' + world;
}

console.log(say('hello'));
console.log(say('hello', 'there'));
