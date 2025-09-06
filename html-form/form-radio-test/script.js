(() => {
    const pageInit = () => {
        const form = document.getElementById('fruit-form');
        const resultElement = document.getElementById('result');
        const btnGroup = form.querySelector('[data-id="btn-group-all"]');

        if (!form || !resultElement || !btnGroup) {
            console.error('필수 요소를 찾을 수 없습니다.');
            return;
        }

        const fruitRadios = form.elements.fruit;
        const colorRadios = form.elements.color;

        const actions = {
            btn11: () => {
                const selectedFruit = form.querySelector('input[name="fruit"]:checked');
                resultElement.textContent = selectedFruit ? `선택한 과일: ${selectedFruit.value}` : '과일을 선택해주세요.';
            },
            btn12: () => {
                const bananaRadio = document.getElementById('banana');
                if (bananaRadio) bananaRadio.checked = true;
            },
            btn13: (target) => {
                const orangeRadio = document.getElementById('orange');
                if (orangeRadio) {
                    orangeRadio.disabled = !orangeRadio.disabled;
                    target.textContent = orangeRadio.disabled ? '오렌지 활성화 하기' : '오렌지 비활성화 하기';
                }
            },
            btn21: () => {
                const selectedColor = form.querySelector('input[name="color"]:checked');
                resultElement.textContent = selectedColor ? `선택한 색상: ${selectedColor.value}` : '색상을 선택해주세요.';
            },
            btn22: () => {
                const greenRadio = document.getElementById('green');
                if (greenRadio) greenRadio.checked = true;
            },
            btn23: (target) => {
                const blueRadio = document.getElementById('blue');
                if (blueRadio) {
                    blueRadio.disabled = !blueRadio.disabled;
                    target.textContent = blueRadio.disabled ? '파랑 활성화 하기' : '파랑 비활성화 하기';
                }
            },
            btn4: () => {
                [...fruitRadios, ...colorRadios].forEach(radio => {
                    radio.checked = false;
                    radio.disabled = false;
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