function getAttrNum(el, attr) {
    var val = el.getAttribute(attr);
    if (val === null) return null;
    if (val === '') return null;
    var num = Number(val);
    return isNaN(num) ? null : num;
}

function validateNumberInput(value, min, max, maxLen) {
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

    var validateNumber = () => {
        var value = input.value;
        var min = getAttrNum(input, 'data-min-value');
        var max = getAttrNum(input, 'data-max-value');
        var maxLen = getAttrNum(input, 'data-max-length');
        
        value = value.replace(/[^0-9]/g, '');
        
        if (maxLen !== null && maxLen > 0) {
            value = value.slice(0, maxLen);
        }
        
        input.value = value;
        
        var error = validateNumberInput(value, min, max, maxLen);
        if (errorMessageEl) errorMessageEl.textContent = error;
    };

    input.addEventListener('input', validateNumber);
    input.addEventListener('blur', validateNumber);
}

document.addEventListener('DOMContentLoaded', function () {
    applyNumberInput(document.querySelector('input[type="text"][name="age"]'), document.querySelector('.error-age'));
    applyNumberInput(document.querySelector('input[type="text"][name="score"]'), document.querySelector('.error-score'));
});