function step1(callback) {
    console.log('step1 begin');
    setTimeout(() => {
        callback();
    }, 1000);
}

function step2(callback) {
    console.log('step2 begin');
    setTimeout(() => {
        callback();
    }, 1000);
}

function step3(callback) {
    console.log('step3 begin');
    setTimeout(() => {
        callback();
    }, 1000);
}

// -----------------------------------------

step1(function() {
    console.log('step1 end');

    step2(function() {
        console.log('step2 end');

        step3(function() {
            console.log('step3 end');
        });
    });
});
