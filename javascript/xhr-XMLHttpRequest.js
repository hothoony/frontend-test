function callAjax(method, url, data = {}, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            console.log('xmlHttp.status', xmlHttp.status);
            if (xmlHttp.status == 200) {
                console.log(xmlHttp.status, 'success');
                callback(xmlHttp.responseText);
            }
            else if (xmlHttp.status == 404) {
                console.log(xmlHttp.status, 'not found');
            }
            else if (xmlHttp.status == 400) {
                console.log(xmlHttp.status, 'bad request');
            }
            else if (xmlHttp.status == 500) {
                console.log(xmlHttp.status, 'server error');
            }
        }
    };
    let async = true;
    xmlHttp.open(method, url, async);
    xmlHttp.send(data);
}
function checkResponse(responseText) {
    let jsonText = responseText;
    let jsonObject = JSON.parse(jsonText);
    console.log('jsonText', jsonText);
    console.log('jsonObject', jsonObject);
    console.log('type jsonText', toString.call(jsonText));
    console.log('type jsonObject', toString.call(jsonObject));
}

let method = 'get';
let data = {};

// 200
callAjax(method, 'https://dummyjson.com/products/1', data, checkResponse);

// 404
// callAjax(method, 'https://dummyjson.com/products/1/NOT_FOUND', data, checkResponse);
