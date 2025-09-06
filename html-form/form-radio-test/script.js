(() => {

    const pageInit = () => {

        const form = document.getElementById('fruit-form');
        const resultElement = document.getElementById('result');
        const btnGroup = form.querySelector('[data-id="btn-group"]');

        const actions = {
            btn1: () => {
                const selectedFruit = form.querySelector('input[name="fruit"]:checked');
                resultElement.textContent = selectedFruit ? `선택한 과일: ${selectedFruit.value}` : '과일을 선택해주세요.';
            },
            btn2: () => {
                document.getElementById('banana').checked = true;
            },
            btn3: (target) => {
                const orangeRadio = document.getElementById('orange');
                orangeRadio.disabled = !orangeRadio.disabled;
                target.textContent = orangeRadio.disabled ? '오렌지 활성화 하기' : '오렌지 비활성화 하기';
            },
            btn4: () => {
                form.elements.fruit.forEach(radio => {
                    radio.checked = false;
                    radio.disabled = false;
                });

                document.getElementById('btn3').textContent = '오렌지 비활성화 하기';
                resultElement.textContent = '';
            }
        };

        btnGroup.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName !== 'BUTTON' || !actions[target.id]) return;
            
            actions[target.id](target);
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        pageInit();
    });

})();
