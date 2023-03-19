// ------------------------------------------------------------------------------
// API call
// ------------------------------------------------------------------------------
const chkToken = async (resultType) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resultType === SUCC) {
                resolve({success: true, message: 'chkToken 성공', token: '저장된_토큰'});
            }
            else if (resultType === FAIL) {
                resolve({success: false, message: 'chkToken 실패', token: null});
            }
            else {
                reject({success: false, message: 'chkToken 실패', error: '네트워크 에러'});
            }
        }, 1000);
    });
}

const apiLogin = async (resultType) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resultType === SUCC) {
                resolve({success: true, message: 'apiLogin 성공', token: 'login_성공_토큰'});
            }
            else if (resultType === FAIL) {
                resolve({success: false, message: 'apiLogin 실패', token: null});
            }
            else {
                reject({success: false, message: 'apiLogin 실패', error: '네트워크 에러'});
            }
        }, 1000);
    });
}

const userInfo = async (resultType) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resultType === SUCC) {
                resolve({success: true, message: 'userInfo 성공', data: {userName: 'paul'}});
            }
            else if (resultType === FAIL) {
                resolve({success: false, message: 'userInfo 실패', data: null});
            }
            else {
                reject({success: false, message: 'userInfo 실패', error: '네트워크 에러'});
            }
        }, 1000);
    });
}


// ------------------------------------------------------------------------------
// 서비스 로직 (사용자 정보 조회)
// - 토큰 확인 > 토큰이 있으면 > 사용자 정보를 조회한다
// - 토큰 확인 > 토큰이 없으면 > API 에 로그인을 하고 > 사용자 정보를 조회한다
// ------------------------------------------------------------------------------
const doService1 =  async (success1, success2, success3) => {

    await chkToken(success1)
    .then(async res => {
        console.log('chkToken res', res);

        if (res.success) {
            return await userInfo(success3)
            .then(res => {
                console.log('userInfo res', res);
                if (res.success) {
                    return Promise.resolve({success: true, res: res});
                } else {
                    return Promise.resolve({success: false, res: res});
                }
            })
            .catch(err => {
                console.log('userInfo err', err);
                return Promise.reject(err);
            });
        }
        else {
            return await apiLogin(success2)
            .then(async res => {
                console.log('apiLogin res', res);

                if (res.success) {
                    await userInfo(success3)
                    .then(res => {
                        console.log('userInfo res', res);
                        if (res.success) {
                            return Promise.resolve({success: true, res: res});
                        } else {
                            return Promise.resolve({success: false, res: res});
                        }
                    })
                    .catch(err => {
                        console.log('userInfo err', err);
                        return Promise.reject(err);
                    });
                }
            })
        }

    })
    .catch(async err => {
        console.log('chkToken err', err);
    })
    .finally(() => {
        console.log('실행종료');
    })
    ;
}

const doService2 =  async (success1, success2, success3) => {

    await chkToken(success1)
    .then(async res => {
        console.log('chkToken res', res);

        if (res.success) {
            return Promise.resolve(res);
        }
        return await apiLogin(success2);

    })
    .then(async res => {
        console.log('chkToken & apiLogin res', res);
        if (res.success) {
            return await userInfo(success3);
        } else {
            return Promise.reject('token not exist');
        }
    })
    .then(res => {
        if (res.success) {
            console.log('userInfo res', res);
        } else {
            console.log('userInfo fail', res);
        }
    })
    .catch(err => {
        console.log('doService2 err', err);
    })
    .finally(() => {
        console.log('실행종료');
    })
    ;
}

const doService3 = async (success1, success2, success3) => {
    try {

        const res_chkToken = await chkToken(success1);
        console.log('res_chkToken', res_chkToken);
        
        if (res_chkToken.success) {
            const res_userInfo = await userInfo(success3);
            console.log('res_userInfo', res_userInfo);
        }
        else {
            const res_apiLogin = await apiLogin(success2);
            console.log('res_apiLogin', res_apiLogin);
            if (res_apiLogin.success) {
                const res_userInfo = await userInfo(success3);
                console.log('res_userInfo', res_userInfo);
            }
        }

    } catch (err) {
        console.log('doService3 err', err);
    } finally {
        console.log('실행종료');
    }
}
 

// ------------------------------------------------------------------------------
// 실행
// ------------------------------------------------------------------------------
const SUCC = 1;
const FAIL = 2;
const ERR = 0;

// chkToken(SUCC)
// apiLogin(SUCC)
// userInfo(SUCC)

// userInfo(SUCC)
// userInfo(FAIL)
// userInfo(ERR)
// .then(res => {
//     console.log('res', res);
// })
// .catch (err => {
//     console.log('err', err);
// });

// doService1(SUCC, SUCC, SUCC);
// doService1(SUCC, SUCC, FAIL);
// doService1(SUCC, FAIL, SUCC);
// doService1(FAIL, SUCC, SUCC);
// doService1(FAIL, FAIL, SUCC);
// doService1(ERR, SUCC, SUCC);
// doService1(SUCC, ERR, SUCC);
// doService1(SUCC, SUCC, ERR);

// doService2(SUCC, SUCC, SUCC);
// doService2(FAIL, SUCC, SUCC);
doService2(FAIL, FAIL, SUCC);

// doService3(SUCC, SUCC, SUCC);
// doService3(FAIL, SUCC, SUCC);
// doService3(FAIL, FAIL, SUCC);
// doService3(ERR, SUCC, SUCC);
// doService3(SUCC, ERR, SUCC);
// doService3(SUCC, SUCC, ERR);
// doService3(FAIL, FAIL, ERR);
