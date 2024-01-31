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

Date.prototype.format2 = function(f) {

    f = f.replace(/yyyy/g, this.getFullYear());
    f = f.replace(/yy/g, String(this.getFullYear()).substring(2, 4));
    f = f.replace(/MM/g, String(this.getMonth() + 1).padStart(2, '0'));
    f = f.replace(/dd/g, String(this.getDate()).padStart(2, '0'));
    f = f.replace(/hh/g, String(this.getHours()).padStart(2, '0'));
    f = f.replace(/mm/g, String(this.getMinutes()).padStart(2, '0'));
    f = f.replace(/ss/g, String(this.getSeconds()).padStart(2, '0'));

    return f;
}

let date = new Date();

console.log(date);
console.log('yyyyMMdd            =', date.format2('yyyyMMdd'));
console.log('yyMMdd              =', date.format2('yyMMdd'));
console.log('yyyy                =', date.format2('yyyy'));
console.log('yyyyMM              =', date.format2('yyyyMM'));
console.log('MMdd                =', date.format2('MMdd'));
console.log('hhmm                =', date.format2('hhmm'));
console.log('hhmmss              =', date.format2('hhmmss'));
console.log('yyyy-MM-dd hh:mm    =', date.format2('yyyy-MM-dd hh:mm'));
console.log('yyyy-MM-dd hh:mm:ss =', date.format2('yyyy-MM-dd hh:mm:ss'));
