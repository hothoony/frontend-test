(() => {
    const pageInit = () => {
        const form = document.getElementById('fruit-form');
        const resultElement = document.getElementById('result');
        const btnGroup = form.querySelector('[data-id="btn-group-all"]');

        if (!form || !resultElement || !btnGroup) {
            console.error('필수 요소를 찾을 수 없습니다.');
            return;
        }

        const fruitCheckboxes = form.elements.fruit;
        const colorCheckboxes = form.elements.color;

        const actions = {
            btn11: () => {
                const selectedFruits = form.querySelectorAll('input[name="fruit"]:checked');
                if (selectedFruits.length > 0) {
                    const fruitValues = Array.from(selectedFruits).map(fruit => fruit.value);
                    resultElement.textContent = `선택한 과일: ${fruitValues.join(', ')}`;
                } else {
                    resultElement.textContent = '과일을 선택해주세요.';
                }
            },
            btn12: () => {
                const bananaCheckbox = document.getElementById('banana');
                if (bananaCheckbox) bananaCheckbox.checked = !bananaCheckbox.checked;
            },
            btn13: (target) => {
                const orangeCheckbox = document.getElementById('orange');
                if (orangeCheckbox) {
                    orangeCheckbox.disabled = !orangeCheckbox.disabled;
                    target.textContent = orangeCheckbox.disabled ? '오렌지 활성화 하기' : '오렌지 비활성화 하기';
                }
            },
            btn21: () => {
                const selectedColors = form.querySelectorAll('input[name="color"]:checked');
                if (selectedColors.length > 0) {
                    const colorValues = Array.from(selectedColors).map(color => color.value);
                    resultElement.textContent = `선택한 색상: ${colorValues.join(', ')}`;
                } else {
                    resultElement.textContent = '색상을 선택해주세요.';
                }
            },
            btn22: () => {
                const greenCheckbox = document.getElementById('green');
                if (greenCheckbox) greenCheckbox.checked = !greenCheckbox.checked;
            },
            btn23: (target) => {
                const blueCheckbox = document.getElementById('blue');
                if (blueCheckbox) {
                    blueCheckbox.disabled = !blueCheckbox.disabled;
                    target.textContent = blueCheckbox.disabled ? '파랑 활성화 하기' : '파랑 비활성화 하기';
                }
            },
            btn4: () => {
                [...fruitCheckboxes, ...colorCheckboxes].forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.disabled = false;
                });

                const btn13 = document.getElementById('btn13');
                const btn23 = document.getElementById('btn23');
                if (btn13) btn13.textContent = '오렌지 비활성화 하기';
                if (btn23) btn23.textContent = '파랑 비활성화 하기';

                resultElement.textContent = '';
            }
        };

        btnGroup.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName !== 'BUTTON' || !actions[target.id]) return;

            actions[target.id](target);
        });
    };

    document.addEventListener('DOMContentLoaded', pageInit);
})();