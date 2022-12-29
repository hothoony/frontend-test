let data = {
    name: 'john',
    age: 20,
    scores: [90, 100, 95, 100, 93],
    male: true,
    tools: {
        intellij: true,
        eclipse: false,
    }
};

console.log(Object.keys(data));     // ['name', 'age', 'scores', 'male', 'tools']

console.log(Object.values(data));   // ['john', 20, Array(5), true, {…}]

console.log(Object.entries(data));  // [Array(2), Array(2), Array(2), Array(2), Array(2)]
// 0: (2) ['name', 'john']
// 1: (2) ['age', 20]
// 2: (2) ['scores', Array(5)]
// 3: (2) ['male', true]
// 4: (2) ['tools', {…}]
