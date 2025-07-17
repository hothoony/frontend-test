let dataList = [11, 'aa', [10, 20], {name: 'paul', age: 20}];

const getDetailAll = function([num, str, list, obj]) {
    console.log('');
    console.log('## getDetailAll');
    console.log('num', num);
    console.log('str', str);
    console.log('list', list);
    console.log('obj', obj);
};

const getNum = function([num]) {
    console.log('');
    console.log('## getNum');
    console.log('num', num);
};

const getStr = function([,str]) {
    console.log('');
    console.log('## getStr');
    console.log('str', str);
};

const getList = function([,,list]) {
    console.log('');
    console.log('## getList');
    console.log('list', list);
};

const getObj = function([,,,obj]) {
    console.log('');
    console.log('## getObj');
    console.log('obj', obj);
};

getDetailAll(dataList);
getNum(dataList);
getStr(dataList);
getList(dataList);
getObj(dataList);
