let data = [
    {no: 1, key: 'nickname', value: 'memtest01'},
    {no: 2, key: 'first_name', value: 'memtest01'},
    {no: 3, key: 'last_name', value: ''},
    {no: 4, key: 'adminRole', value: 'ADMTYPE01_CONTENT_ADMIN'},
    {no: 5, key: 'credit', value: '150000'},
    // {key: 'userPhone', value: '.'},
    // {key: 'key', value: 'wp_capabilities'},
    // {key: 'value', value: {}},
    // {key: 'value_list', value: []},
];

const printArray = (ary) => {
    for (let index in ary) {
        console.log(index, ary[index]);
    }
}
const checkValue = (key) => {
    data.map(item => {
        if (item.key == key) {
            console.log(key, '=', item.value);
        }
    })
}
const changeData = (ary, key, value) => {
    const index = ary.findIndex(item => item.key == key);
    console.log('index=', index, ', item=', ary[index]);

    ary = [
        ...ary.slice(0, index),
        {
            'no': 4,
            'key': key,
            'value': value,
            [key.toUpperCase()]: value,
        },
        ...ary.slice(index + 1),
    ];

    return ary;
}


printArray(data);
checkValue('adminRole');
console.log('');

data = changeData(data, 'adminRole', '123');

printArray(data);
checkValue('adminRole');
console.log('');
