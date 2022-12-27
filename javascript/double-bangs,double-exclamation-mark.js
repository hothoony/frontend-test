// double bangs
// double exclamation mark

console.log('');
console.log(!!null);        // false
console.log(!!undefined);   // false
console.log(!!'');          // false
console.log(!!' ');         // true

function hasValue1(value) {
    return (value != null && value != undefined && String(value??'').trim() != '');
}
function hasValue2(value) {
    return !!String(value??'').trim() === '';
}

console.log('');
console.log('hasValue1 null =>', hasValue1(null));
console.log('hasValue1 undefined =>', hasValue1(undefined));
console.log('hasValue1 \'\' =>', hasValue1(''));
console.log('hasValue1 \' \' =>', hasValue1(' '));

console.log('');
console.log('hasValue2 null =>', hasValue2(null));
console.log('hasValue2 undefined =>', hasValue2(undefined));
console.log('hasValue2 \'\' =>', hasValue2(''));
console.log('hasValue2 \' \' =>', hasValue2(' '));
