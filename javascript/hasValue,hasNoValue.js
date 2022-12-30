const hasNoValue1 = function(value) {
    return String(value??'').trim() === '';
}
const hasValue1 = function(value) {
    return !String(value??'').trim() === '';
}

const hasValue2 = function(value) {
    return !!String(value??'').trim() == '';
}
const hasNoValue2 = function(value) {
    return !hasValue2(value);
}

let values = [null, undefined, '', ' '];

console.log('');
console.log('hasNoValue1(null)       =', hasNoValue1(null));
console.log('hasNoValue1(undefined)  =', hasNoValue1(undefined));
console.log('hasNoValue1("")         =', hasNoValue1(''));
console.log('hasNoValue1(" ")        =', hasNoValue1(' '));

console.log('');
console.log('hasValue1(null)         =', hasValue1(null));
console.log('hasValue1(undefined)    =', hasValue1(undefined));
console.log('hasValue1("")           =', hasValue1(''));
console.log('hasValue1(" ")          =', hasValue1(' '));

console.log('');
console.log('hasValue2(null)         =', hasValue2(null));
console.log('hasValue2(undefined)    =', hasValue2(undefined));
console.log('hasValue2("")           =', hasValue2(''));
console.log('hasValue2(" ")          =', hasValue2(' '));

console.log('');
console.log('hasNoValue2(null)         =', hasNoValue2(null));
console.log('hasNoValue2(undefined)    =', hasNoValue2(undefined));
console.log('hasNoValue2("")           =', hasNoValue2(''));
console.log('hasNoValue2(" ")          =', hasNoValue2(' '));
