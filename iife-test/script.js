(function() {
    console.log('standard IIFE');
})();

(() => {
    console.log('arrow function variant');
})();

(async () => {
    console.log('async IIFE');
})();