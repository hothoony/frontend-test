const healthObj = {
    showHealth : function() {
        console.log('hi, ' + this.healthTime);
    }
};

// Object.assign
const myHealth = Object.assign(Object.create(healthObj), {
    healthTime: '11:20',
    name: 'crong',
});

console.log(myHealth);
