function initApp() {
    const form = document.getElementById('numberForm');
    const input = document.getElementById('numberInput');
    const errorMsg = document.getElementById('errorMsg');

    // 숫자만 입력 가능하도록 keydown 이벤트 처리
    input.addEventListener('input', function (e) {
        // 숫자가 아닌 문자는 모두 제거
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value === '') {
            errorMsg.textContent = '빈 문자열은 허용되지 않습니다.';
            input.focus();
            return;
        }
        errorMsg.textContent = '';
        alert('입력값: ' + input.value);
        // 실제 제출이 필요하다면 아래 주석 해제
        // form.submit();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});