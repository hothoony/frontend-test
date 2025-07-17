let pages = {
    "segments": {
        "segment": [
            {"id": 1, "insertTime": -10, "duration": 10},
            {"id": 2, "insertTime": 0, "duration": 20},
            {"id": 3, "insertTime": 20, "duration": 30},
        ],
        "background": [
            {"id": 1, "insertTime": -10, "duration": 10},
            {"id": 2, "insertTime": 0, "duration": 20},
            {"id": 3, "insertTime": 20, "duration": 30},
        ],
        "image": [
            {"id": 1, "insertTime": -10, "duration": 10},
            {"id": 2, "insertTime": 0, "duration": 20},
            {"id": 3, "insertTime": 20, "duration": 30},
        ],
    },
};

console.log();
console.log('pages=', pages);


// background.insertTime 을 모두 0 으로 변경
const result1 = {
    ...pages,
    segments: {
        ...pages.segments,
        background: pages.segments.background.map(background => ({
            ...background,
            insertTime: 0,
        })),
    },
};

console.log();
console.log('result1=', result1);


// background.insertTime 이 음수인 것만 0 으로 젼경
const result2 = {
    ...pages,
    segments: {
        ...pages.segments,
        background: pages.segments.background.map(background => ({
            ...background,
            insertTime: background.insertTime < 0 ? 0 : background.insertTime,
        })),
    },
};

console.log();
console.log('result2=', result2);


// background.insertTime 이 음수가 있으면 alert
const existMinus = pages.segments.background.some(background => (
    background.insertTime < 0
));

console.log();
console.log('existMinus=', existMinus);
