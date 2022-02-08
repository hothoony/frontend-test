let data = [10, 'a', undefined, null, NaN, ""];

console.log('\n## for i');
for (var i = 0; i < data.length; i++) {
    console.log(i + ":", data[i]);
}

console.log('\n## forEach');
data.forEach(function(value) {
    console.log(value);
})

console.log('\n## for in');
for (let i in data) {
    console.log(i + ":", data[i]);
}

console.log('\n## for of');
for (let i of data) {
    console.log(i + ":", data[i]);
}
