function Health(name) {
    this.name = name;
}
Health.prototype.showHealth = function() {
    console.log(this.name + ' hi');
}

let h = new Health('cron');
h.showHealth();

// ----------------------------------------------------------

// function 임
class Health2 {
    constructor(name, lastTime) {
        this.name = name;
        this.lastTime = lastTime;
    }
    showHealth() {
        console.log(this.name + ' hi');
    }
}

let h2 = new Health2('petty');
h2.showHealth();
