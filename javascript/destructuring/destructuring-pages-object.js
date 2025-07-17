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

pages = {
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
console.log('pages=', pages);
