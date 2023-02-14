Date.prototype.format = function(f) {

    if (f === null || f === undefined || String(f).trim() === '') {
        f = 'yyyy-MM-dd';
    }

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

let today = new Date();
let bgnDate;
let endDate;

console.log('');
console.log('      today =', today.format());

bgnDate = new Date(today);
endDate = new Date(today);
console.log('');
console.log('오늘');
console.log('    bgnDate =', bgnDate.format());
console.log('    endDate =', endDate.format());

bgnDate = new Date(today);
endDate = new Date(today);
bgnDate.setDate(bgnDate.getDate() - bgnDate.getDay()); // 이번주 일요일 구하기
console.log('');
console.log('이번주');
console.log('    bgnDate =', bgnDate.format());
console.log('    endDate =', endDate.format());

bgnDate = new Date(today);
endDate = new Date(today);
bgnDate.setDate(1);
console.log('');
console.log('이번달');
console.log('    bgnDate =', bgnDate.format());
console.log('    endDate =', endDate.format());

bgnDate = new Date(today);
endDate = new Date(today);
bgnDate.setMonth(0);
bgnDate.setDate(1);
console.log('');
console.log('이번연도');
console.log('    bgnDate =', bgnDate.format());
console.log('    endDate =', endDate.format());
