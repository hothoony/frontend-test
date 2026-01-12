function test1(status) {
    if (status == 200) {
        console.log(200);
    }
    if (status == 400) {
        console.log(400);
    }
    if (status == 500) {
        console.log(500);
    }
}

function test2(status) {
    if (status == 200) {
        console.log(200);
    } else if (status == 400) {
        console.log(400);
    } else {
        console.log(500);
    }
}

test1(400);
// test2(400);