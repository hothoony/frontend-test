// fetch, then 을 await 없이 사용하면 동기로 실행되지 않는다
function callApi1() {
    console.log('callApi begin');
    fetch('https://dummyjson.com/users/1?delay=1000')
    .then(res => {
        return res.json();
    })
    .then(body => {
        console.log(body.firstName);
    });
    console.log('callApi end');
}

// fetch, then 을 await 와 같이 사용하면 동기로 실행된다
async function callApi2() {
    console.log('callApi begin');
    await fetch('https://dummyjson.com/users/1?delay=1000')
    .then(res => {
        return res.json();
    })
    .then(body => {
        console.log(body.firstName);
    });
    console.log('callApi end');
}

// fetch 를 then 없이 await 와 같이 사용하기
async function callApi3() {
    console.log('callApi begin');
    const res = await fetch('https://dummyjson.com/users/1?delay=1000');
    const body = await res.json();
    console.log(body.firstName);
    console.log('callApi end');
}

// fetch 사용시 동기로 실행하려면
// then 사용여부와 관계없이
// await 를 사용해야 한다

// callApi1();
// callApi2();
callApi3();
