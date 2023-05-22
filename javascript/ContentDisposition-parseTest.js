let contentDisposition = 'attachment; filename=%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%A1%E1%84%86%E1%85%A1%20%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB.png;';
console.log('contentDisposition =', contentDisposition);

const getFilename = (contentDisposition) => {
    let list = contentDisposition.split(';');
    for (let item of list) {
        if (item.indexOf('filename') > -1) {
            return item.split('=')[1];
        }
    }
    return null;
}

let filename = getFilename(contentDisposition);
console.log('');
console.log('filename =', filename);
