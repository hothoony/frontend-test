function step1(callback) {
    console.log('step1 processing');
    setTimeout(() => {
        callback();
    }, 1000);
}

function step2(callback) {
    console.log('step2 processing');
    setTimeout(() => {
        callback();
    }, 1000);
}

function step3(callback) {
    console.log('step3 processing');
    setTimeout(() => {
        callback();
    }, 1000);
}

// -----------------------------------------

step1(function() {
    console.log('step1 done');

    step2(function() {
        console.log('step2 done');

        step3(function() {
            console.log('step3 done');
        });
    });
});
