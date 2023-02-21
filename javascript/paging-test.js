
let dataList = [];
for (let i = 0; i < 33; i++) {
    dataList.push(101 + i);
}
console.log('dataList', dataList);

let totalList = dataList.length;
let listSize = 5;
let pageSize = 3;
let totalPageNo      = Math.floor(totalList / listSize) + (totalList % listSize == 0 ? 0 : 1);
let totalPageNoGroup = Math.floor(totalPageNo / pageSize) + (totalPageNo % pageSize == 0 ? 0 : 1);

console.log('totalList', totalList);
console.log('listSize', listSize);
console.log('pageSize', pageSize);
console.log('totalPageNo', totalPageNo);
console.log('totalPageNoGroup', totalPageNoGroup);

function printPageList(page) {

    if (page <= 0) return;

    let startPage = listSize * (page - 1) + 1;
    let endPage = startPage + listSize;

    if (page > totalPageNo) {
        page = totalPageNo;
        return;
    }

    let result = [];
    for (let i = startPage; i < endPage; i++) {
        if (i > totalList) continue;
        result.push(i);
    }
    console.log('----page', page, '=>', result);
}
function printPageNo() {
    
    let pageSize = 3;
    let totalPageNo = 11;
    let pageGroup = 1;

    const printPageGroup = (pageGroup) => {
        let startPageNo = pageSize * (pageGroup - 1) + 1;
        let endPageNo = startPageNo + (pageSize - 1);
        
        if (startPageNo > totalPageNo) {
            return;
        }
        if (endPageNo > totalPageNo) {
            endPageNo = totalPageNo;
        }

        let pages = [];
        for (let pageNo = startPageNo; pageNo <= endPageNo; pageNo++) {
            pages.push(pageNo);
        }
        console.log('pageGroup', pageGroup, 'pages', pages);
    }

    for (let currPageGroup = pageGroup; currPageGroup <= totalPageNoGroup; currPageGroup++) {
        printPageGroup(currPageGroup);
    }
}

// for (let i = 1; i <= totalPageNo; i++) {
//     printPageList(i);
// }

console.log('');
printPageNo();
