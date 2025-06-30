function getAttrNum(el, attr) {
    var val = el.getAttribute(attr);
    if (val === null) return null;
    if (val === '') return null;
    var num = Number(val);
    return isNaN(num) ? null : num;
}

function validateNumberInput(input) {
    var value = input.value;
    var min = getAttrNum(input, 'data-min-value');
    var max = getAttrNum(input, 'data-max-value');
    var maxLen = getAttrNum(input, 'data-max-length');
    var required = document.querySelector('input[name="age"]').hasAttribute('required')

    if (required && value === '') {
        return '필수 입력 항목입니다';
    }
    
    if (value === '') {
        return '';
    }
    
    if (!/^[0-9]+$/.test(value)) return '숫자만 입력 가능합니다.';
    
    if (maxLen !== null && maxLen > 0 && value.length > maxLen) {
        return `최대 ${maxLen}자리까지 입력 가능합니다.`;
    }
    
    var num = Number(value);
    if (min !== null && num < min) return `${min} 이상 입력하세요.`;
    if (max !== null && num > max) return `${max} 이하 입력하세요.`;
    return '';
}

function applyNumberInput(input, errorMessageEl) {

    var validateNumber = function() {
        var value = input.value;
        var min = getAttrNum(input, 'data-min-value');
        var max = getAttrNum(input, 'data-max-value');
        var maxLen = getAttrNum(input, 'data-max-length');
        
        value = value.replace(/[^0-9]/g, '');
        
        if (maxLen !== null && maxLen > 0) {
            value = value.slice(0, maxLen);
        }
        
        input.value = value;
        
        var error = validateNumberInput(input);
        if (errorMessageEl) errorMessageEl.textContent = error;
    };

    input.addEventListener('input', validateNumber);
    input.addEventListener('blur', validateNumber);
}

function onFormSubmit(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // 기본 제출 동작 방지
        
        const ageInput = document.getElementById('ageInput');
        const scoreInput = document.getElementById('scoreInput');
        
        // 각 입력 필드의 validation 체크
        const ageValidation = validateNumberInput(ageInput);
        const scoreValidation = validateNumberInput(scoreInput);
        
        // 에러 메시지 표시
        const ageError = document.querySelector('.error-age');
        const scoreError = document.querySelector('.error-score');
        ageError.textContent = ageValidation;
        scoreError.textContent = scoreValidation;

        // validation 실패
        if (ageValidation !== '' || scoreValidation !== '') {
            console.warn('❌ validation 실패');
            return false;
        }
        
        // validation 통과
        const formData = {
            age: ageInput.value,
            score: scoreInput.value,
        };
        
        console.log('✅ validation 통과');
        console.log('폼 제출 데이터:', formData);

        return true;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    
    applyNumberInput(document.querySelector('input[type="text"][name="age"]'), 
                     document.querySelector('.form-group:has(input[name="age"]) .error'));
    
    applyNumberInput(document.querySelector('input[type="text"][name="score"]'), 
                     document.querySelector('.form-group:has(input[name="score"]) .error'));
    
    // 폼 제출 이벤트 처리
    onFormSubmit(document.querySelector('form'));
    
});