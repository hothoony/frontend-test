
let dataList = [];
for (let i = 0; i < 103; i++) {
    dataList.push(101 + i);
}
console.log('dataList', dataList);

let totalList = dataList.length;
let listSize = 10;
let pageSize = 10;

console.log('totalList', totalList);
console.log('listSize', listSize);
console.log('pageSize', pageSize);

let currPage;
let restPage = (totalList % listSize > 0) ? 1 : 0;
let totalPage = Math.floor(totalList / listSize) + restPage;
let pageGroup;

console.log('restPage', restPage);
console.log('totalPage', totalPage);

/*
1 => 1 2 3 4 5
2 => 6 7 8 9 10
3 => 11 12 13 14 15
*/
function printPage(page) {
    let startPage = pageSize * (page - 1) + 1;
    let endPage = startPage + pageSize;

    

    let result = [];
    for (let i = startPage; i < endPage; i++) {
        result.push(i);
    }
    console.log('page', page, '=>', result);
}

for (let i = 1; i <= 20; i++) {
    printPage(i);
}
