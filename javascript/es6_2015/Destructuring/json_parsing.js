let news = [
    {
        "title": "sbs",
        "url": "http://www.sbc.com",
        "newslist": [
            "8시뉴스",
            "스포츠뉴스"
        ]
    },
    {
        "title": "mbc",
        "url": "http://www.mbc.com",
        "newslist": [
            "뉴스데스크",
            "8시뉴스"
        ]
    },
];

let [,mbc] = news;
console.log();
console.log(mbc);
let {title, url} = mbc;
console.log(title, url);

let [,{title: title2, newslist: newslist2}] = news;
console.log();
console.log(newslist2);
