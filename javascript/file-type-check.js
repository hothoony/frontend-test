const checkFileType = (file) => {

    const fileTypes = [
        // image
        {type: 'image', ext: '.jpeg'},
        {type: 'image', ext: '.jpg'},
        {type: 'image', ext: '.png'},
        {type: 'image', ext: '.gif'},
        // video
        {type: 'video', ext: '.avi'},
        {type: 'video', ext: '.mov'},
        {type: 'video', ext: '.webm'},
        {type: 'video', ext: '.mp4'},
        // audio
        {type: 'audio', ext: '.wav'},
        // document
        {type: 'doc', ext: '.pdf'},
    ];

    for (let fileType of fileTypes) {
        let regex = new RegExp(`\\${fileType.ext}$`);
        if (regex.test(file)) {
            console.log(file + ' => ' + fileType.type);
        }
    }
}

const files = [
    './2170-1675913467.webm',
    './86899-1675990418.wav',
    './ㅇㅇ 복사본 1 2022-10-17 02-42-55.mp4',
    './abc-1-2.png',
    './KakaoTalk_Photo_2022-07-07-15-03-59.jpg',
    './KakaoTalk_Photo_2022-07-07-15-03-59.jpeg',
    './영상 TEST 복사본 1 2022-10-04 04-28-52.avi',
    './2023-02-10 10-28-41.mov',
    './1665540114395.pdf',
];

for (let file of files) {
    checkFileType(file);
}
