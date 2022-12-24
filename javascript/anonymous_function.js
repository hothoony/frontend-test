let func1 = (function() {
    console.log('anonymous function func1 called');
})();

let func2 = (function() {
    console.log('anonymous function func2 called');
}());

console.log('func1', func1);
console.log('func2', func2);
