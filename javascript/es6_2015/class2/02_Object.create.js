const healthObj = {
    showHealth : function() {
        console.log('hi, ' + this.healthTime);
    }
};

// Object.create
const myHealth = Object.create(healthObj);
myHealth.healthTime = '11:20'
myHealth.name = 'crong'

console.log(myHealth);
