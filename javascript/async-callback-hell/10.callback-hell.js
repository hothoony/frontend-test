function step1(success = true, successCallback, failCallback) {
    console.log('step1 begin');
    setTimeout(() => {
        if (success) {
            console.log('step1 end');
            successCallback();
        } else {
            failCallback(new Error('fail step1'));
        }
    }, 1000);
}

function step2(success = true, successCallback, failCallback) {
    console.log('step2 begin');
    setTimeout(() => {
        if (success) {
            console.log('step2 end');
            successCallback();
        } else {
            failCallback(new Error('fail step2'));
        }
    }, 1000);
}

function step3(success = true, successCallback, failCallback) {
    console.log('step3 begin');
    setTimeout(() => {
        if (success) {
            console.log('step3 end');
            successCallback();
        } else {
            failCallback(new Error('fail step3'));
        }
    }, 1000);
}

// -----------------------------------------

function successAll() {
    const finalJob = () => {
        console.log('finally');
    };

    step1(true, function() {

        step2(true, function() {
            
            step3(true, function() {
                finalJob();
            }, function(e) {
                console.log('err', e);
                finalJob();
            });
        }, function(e) {
            console.log('err', e);
            finalJob();
        });
    }, function(e) {
        console.log('err', e);
        finalJob();
    });
}

function failTest() {
    const finalJob = () => {
        console.log('finally');
    };

    step1(true, function() {

        step2(false, function() {
            
            step3(true, function() {
                finalJob();
            }, function(e) {
                console.log('err', e);
                finalJob();
            });
        }, function(e) {
            console.log('err', e);
            finalJob();
        });
    }, function(e) {
        console.log('err', e);
        finalJob();
    });
}

// successAll();
failTest();
