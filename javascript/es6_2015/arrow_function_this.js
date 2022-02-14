// callback 함수 안에서 this 사용시 object 를 가리키지 않음
const myObj1 = {
    doJob() {
        setTimeout(function() {
            console.log('\n#1');
            console.log('this', this);
            this.printLog();
        }, 100);
    },
    printLog() {
        console.log('printLog~~~');
    }
};
// TypeError: this.printLog is not a function
// myObj1.doJob();

// -------------------------------------------------

// .bind(this) 사용시 object 를 가리킴
const myObj2 = {
    doJob() {
        setTimeout(function() {
            console.log('\n#2');
            console.log('this', this);
            this.printLog();
        }.bind(this), 100);
    },
    printLog() {
        console.log('printLog~~~');
    }
};
myObj2.doJob();

// -------------------------------------------------

// arrow function 사용시 object 를 가리킴
const myObj3 = {
    doJob() {
        setTimeout(() => {
            console.log('\n#3');
            console.log('this', this);
            this.printLog();
        }, 100);
    },
    printLog() {
        console.log('printLog~~~');
    }
};
myObj3.doJob();
