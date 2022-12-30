// 테스크 코드를 작성한다

describe("pow (테스트할 함수 이름을 표기)", function() {
    it("주어진 숫자의 n 제곱 (함수가 실행하는 동작을 작성한다)", function() {
        assert.equal(pow(2, 3), 8);
    });
});

describe("pow", function() {
    it("3의 n 제곱", function() {
        assert.equal(pow(3, 1), 3);
        assert.equal(pow(3, 2), 9);
        assert.equal(pow(3, 3), 27);
    });
});

describe("pow", function() {
    it("4의 1, 2 제곱", function() {
        assert.equal(pow(4, 1), 4);
        assert.equal(pow(4, 2), 16);
    });
    it("4의 3 제곱", function() {
        assert.equal(pow(4, 3), 12);
    });
});
