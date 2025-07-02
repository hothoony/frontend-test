function initApp() {

    const input = document.getElementById('numberInput');

    // 숫자만 입력 가능하도록 keydown 이벤트 처리
    input.addEventListener('input', function (e) {
        console.log('input', this.value);
        // 숫자가 아닌 문자는 모두 제거
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    input.addEventListener('change', function (e) {
        console.log('change', this.value);
    });

    input.addEventListener('blur', function (e) {
        console.log('blur', this.value);
        if (this.value === '') {
            this.value = '0';
        }
    });

    input.addEventListener('focusout', function (e) {
        console.log('focusout', this.value);
    });

    const form = document.getElementById('numberForm');
    const errorMsg = document.getElementById('errorMsg');

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
