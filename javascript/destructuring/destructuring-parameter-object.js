let obj = {name: 'paul', age: 20, scores: [10, 20, 30]};

const getDetailAll = function({name, age, scores}) {
    console.log('');
    console.log('## getDetailAll');
    console.log('name', name);
    console.log('age', age);
    console.log('scores', scores);
};

const getName = function({name}) {
    console.log('');
    console.log('## getName');
    console.log('name', name);
};

const getAge = function({age}) {
    console.log('');
    console.log('## getAge');
    console.log('age', age);
};

const getScores = function({scores}) {
    console.log('');
    console.log('## getScores');
    console.log('scores', scores);
}

getDetailAll(obj);
getName(obj);
getAge(obj);
getScores(obj);
