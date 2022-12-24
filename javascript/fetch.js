fetch('https://dummyjson.com/products/1')
.then(res => res.json())
.then(console.log)
;

fetch('https://dummyjson.com/products/1')
.then(res => res.json())
.then(json => console.log(json))
;

fetch('https://dummyjson.com/products/1')
.then(res => {
    return res.json();
})
.then(json => {
    console.log(json);
})
;