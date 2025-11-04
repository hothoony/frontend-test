const ApiService = {

    async getUser1(userId) {
        try {
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) throw new Error("Network error");
            const data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            console.error("❌ Failed:", err);
            return null;
        }
    },

    // 모범사례
    // catch 블럭에서 에러를 로깅하고
    // 에러를 다시 전파한다 (에러를 숨기지 않는다)
    async getUser2(userId) {
        try {
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) throw new Error("Network error");
            const data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            console.error("❌ Failed:", err);
            throw err;
        }
    },

    async getUser3(userId) {
        try {
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) throw new Error("Network error");
            const data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            handleApiError(err);
        }
    },

    handleApiError(err) {
        console.error("❌ Failed:", err);
        throw err;
    },

};

const Fn = {

    async fnGetUser1() {
        const result = await ApiService.getUser1('11');
        if (result) {
            console.log('성공');
        } else {
            console.error('실패');
        }
    },

    // 모범사례
    // API 호출부에서 에러를 catch 하고
    // 컨텍스트에 맞게 적절히 핸들링한다 (재시도, UI 표시 등)
    async fnGetUser2() {
        try {
            const result = await ApiService.getUser2('11');
            console.log('성공');
        } catch (err) {
            console.error('실패');
            alert(err.message);
        }
    },

    async fnGetUser3() {
        try {
            const result = await ApiService.getUser3('11');
            console.log('성공');
        } catch (err) {
            console.error('실패');
            alert(err.message);
        }
    },

};
