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

// function arguments 에 destructuring 적용
function getNewsList([,{newslist}]) {
    console.log(newslist);
}
getNewsList(news);
