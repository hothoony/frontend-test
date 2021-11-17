var snsLoginApi = (function() {

    function init() {
        console.log('init');
    }

    function auth() {
        console.log('auth');
    }

    function accessToken() {
        console.log('accessToken');
    }

    function refreshToken() {
        console.log('refreshToken');
    }

    function expireToken() {
        console.log('expireToken');
    }

    init();

    return {
        auth: auth,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expireToken: expireToken,
    };

})();

// snsLoginApi.init(); // error
snsLoginApi.auth();
snsLoginApi.accessToken();
snsLoginApi.refreshToken();
snsLoginApi.expireToken();
