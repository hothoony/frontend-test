// function loadData(url) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let data_database = [
//                 {cmnCd: 'mysql', cmnCdNm: 'MySql'},
//                 {cmnCd: 'oracle', cmnCdNm: 'Oracle'},
//                 {cmnCd: 'postgresql', cmnCdNm: 'Postgresql'},
//             ];
//             resolve(data_database);
//         }, 1000);
//     });
// }

// loadData()
// .then(data => {
//     console.log(data);
// });

// fetch('https://dummyjson.com/products/1')
// .then(res => res.json())
// .then(json => console.log(json))

async function loadJson1() {
    let json = await fetch('https://dummyjson.com/products/1')
    .then(res => res.json());
    // .then(json => console.log(json));
    return json;
}
async function loadJson2() {
    let json = await fetch('https://dummyjson.com/products/2')
    .then(res => res.json())
    // .then(json => console.log(json));
    .then(json => json);
    return json;
}
async function loadJson3() {
    await fetch('https://dummyjson.com/products/3')
    .then(res => res.json())
    // .then(json => console.log(json));
    .then(json => json);
}

Promise.all([
    loadJson1(),
    loadJson2(),
    loadJson3(),
])
.then((values) => {
    console.log('done');
    console.log('values', values);
});


let nodeList = document.querySelectorAll('input, textarea'); 
let elems = Array.from(nodeList);
for (let elem of elems) {
    console.log(elem);
    elem.setAttribute('class', 'error');
}
