(() => {
    const pageInit = () => {
        const form = document.getElementById('fruit-form');
        const resultElement = document.getElementById('result');
        const btnGroup = form.querySelector('[data-id="btn-group-all"]');

        if (!form || !resultElement || !btnGroup) {
            console.error('필수 요소를 찾을 수 없습니다.');
            return;
        }

        const fruitSelect = document.getElementById('fruit-select');
        const colorSelect = document.getElementById('color-select');

        const actions = {
            btn11: () => {
                const selectedFruits = Array.from(fruitSelect.selectedOptions).map(option => option.value);
                if (selectedFruits.length > 0) {
                    resultElement.textContent = `선택한 과일: ${selectedFruits.join(', ')}`;
                } else {
                    resultElement.textContent = '과일을 선택해주세요.';
                }
            },
            btn12: () => {
                const bananaOption = fruitSelect.querySelector('option[value="바나나"]');
                if (bananaOption) {
                    bananaOption.selected = !bananaOption.selected;
                }
            },
            btn13: (target) => {
                const orangeOption = fruitSelect.querySelector('option[value="오렌지"]');
                if (orangeOption) {
                    orangeOption.disabled = !orangeOption.disabled;
                    if (orangeOption.disabled) {
                        orangeOption.selected = false;
                    }
                    target.textContent = orangeOption.disabled ? '오렌지 활성화 하기' : '오렌지 비활성화 하기';
                }
            },
            btn21: () => {
                const selectedColors = Array.from(colorSelect.selectedOptions).map(option => option.value);
                if (selectedColors.length > 0) {
                    resultElement.textContent = `선택한 색상: ${selectedColors.join(', ')}`;
                } else {
                    resultElement.textContent = '색상을 선택해주세요.';
                }
            },
            btn22: () => {
                const greenOption = colorSelect.querySelector('option[value="초록"]');
                if (greenOption) {
                    greenOption.selected = !greenOption.selected;
                }
            },
            btn23: (target) => {
                const blueOption = colorSelect.querySelector('option[value="파랑"]');
                if (blueOption) {
                    blueOption.disabled = !blueOption.disabled;
                    if (blueOption.disabled) {
                        blueOption.selected = false;
                    }
                    target.textContent = blueOption.disabled ? '파랑 활성화 하기' : '파랑 비활성화 하기';
                }
            },
            btn4: () => {
                // 모든 옵션 선택 해제 및 활성화
                Array.from(fruitSelect.options).forEach(option => {
                    option.selected = false;
                    option.disabled = false;
                });
                Array.from(colorSelect.options).forEach(option => {
                    option.selected = false;
                    option.disabled = false;
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