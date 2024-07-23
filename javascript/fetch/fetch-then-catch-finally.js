
// node-fetch 를 사용하기 위해서 npm 으로 설치한다
// npm install node-fetch@2
const fetch = require('node-fetch');

async function callApi() {
    console.log('--callApi fetch');

    throw new Error('throw error 예외 발생!');

    await fetch('https://dummyjson.com/products/1?delay=3000')
    .then(res => {
        console.log('--callApi then');
        return res.json();
    })
    .then(json => {
        console.log('--callApi then');
        console.log('json', json);

        throw new Error('throw error 예외 발생!');

        // return new Promise((resolve, reject) => {
        //     reject('promise reject 예외 발생!');
        // })

        console.log('id' , json.id);
        console.log('category' , json.category);
    })
    .catch(err => {
        console.log('--callApi catch err', err);
        // throw err;
        return new Promise((resolve, reject) => {
            reject(err);
        });
    })
    .finally(() => {
        console.log('--callApi finally');
    })
    ;
}

async function apiTest() {
    console.log('# apiTest begin');
    
    try {
        console.log('--execute callApi begin');
        await callApi()
        .then(res => {
            console.log('--execute callApi then res', res);
        })
        .catch(err => {
            console.log('--execute callApi catch err', err);
        })
        .finally(() => {
            console.log('--execute callApi finally');
        });
        console.log('--execute callApi end');
    } catch (err) {
        console.log('# apiTest catch err =>', err);
    } finally {
        console.log('# apiTest finally');
    }

    console.log('# apiTest end');
}
async function apiTest2() {
    console.log('# apiTest begin');
    
    console.log('--execute callApi begin');
    await callApi()
    .then(res => {
        console.log('--execute callApi then res', res);
    })
    .catch(err => {
        console.log('--execute callApi catch err', err);
    })
    .finally(() => {
        console.log('--execute callApi finally');
    });
    console.log('--execute callApi end');

    console.log('# apiTest end');
}
// apiTest();
apiTest2();
