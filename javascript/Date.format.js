Date.prototype.format = function(f) {

    const lzp2 = (str) => {
        str = String(str??'');
        while (str.length < 2) {
            str = '0' + str;
        }
        return str;
    };

    f = f.replace(/yyyy/g, this.getFullYear());
    f = f.replace(/MM/g, lzp2(this.getMonth() + 1));
    f = f.replace(/dd/g, lzp2(this.getDate()));
    f = f.replace(/hh/g, lzp2(this.getHours()));
    f = f.replace(/mm/g, lzp2(this.getMinutes()));
    f = f.replace(/ss/g, lzp2(this.getSeconds()));

    return f;
}

let date = new Date();

console.log(date);
console.log('yyyyMMdd            =', date.format('yyyyMMdd'));
console.log('yyyy                =', date.format('yyyy'));
console.log('yyyyMM              =', date.format('yyyyMM'));
console.log('MMdd                =', date.format('MMdd'));
console.log('hhmm                =', date.format('hhmm'));
console.log('hhmmss              =', date.format('hhmmss'));
console.log('yyyy-MM-dd hh:mm    =', date.format('yyyy-MM-dd hh:mm'));
console.log('yyyy-MM-dd hh:mm:ss =', date.format('yyyy-MM-dd hh:mm:ss'));
