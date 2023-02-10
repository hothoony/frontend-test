
let dataList = [];
for (let i = 0; i < 103; i++) {
    dataList.push(101 + i);
}
console.log('dataList', dataList);

let totalList = dataList.length;
let listSize = 10;
let pageSize = 10;

console.log('totalList', totalList);

let currPage;
let totalPage = Math.floor(totalList / listSize);

console.log('totalPage', totalPage);

