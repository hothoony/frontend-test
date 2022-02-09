// Set
let set = new Set();
console.log(toString.call(set));
console.log(set.toString());

// add
set.add('aa');
set.add('bb');
set.add('cc');
set.add('AA');
console.log('set', set);

// has
if (set.has('bb')) {
    console.log('bb is exist');
}
if (!set.has('dd')) {
    console.log('dd is not exist');
}

// delete
set.delete('cc');
console.log('set', set);
