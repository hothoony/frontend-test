document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('fruit-form');
    const resultElement = document.getElementById('result');
    const btnGroup = form.querySelector('[data-id="btn-group"]');

    btnGroup.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName !== 'BUTTON') return;

        const fruitRadios = form.elements.fruit;

        switch (target.id) {
            case 'btn1': {
                const selectedFruit = form.querySelector('input[name="fruit"]:checked');
                if (selectedFruit) {
                    resultElement.textContent = `선택한 과일: ${selectedFruit.value}`;
                } else {
                    resultElement.textContent = '과일을 선택해주세요.';
                }
                break;
            }
            case 'btn2': {
                const bananaRadio = document.getElementById('banana');
                if (bananaRadio) {
                    bananaRadio.checked = true;
                }
                break;
            }
            case 'btn3': {
                const orangeRadio = document.getElementById('orange');
                if (orangeRadio) {
                    orangeRadio.disabled = !orangeRadio.disabled;
                    target.textContent = orangeRadio.disabled ? '오렌지 활성화 하기' : '오렌지 비활성화 하기';
                }
                break;
            }
            case 'btn4': {
                // Uncheck all radio buttons
                fruitRadios.forEach(radio => {
                    radio.checked = false;
                });

                // Enable orange radio button
                const orangeRadio = document.getElementById('orange');
                if (orangeRadio) {
                    orangeRadio.disabled = false;
                }

                // Reset orange button text
                const btn3 = document.getElementById('btn3');
                if(btn3) {
                    btn3.textContent = '오렌지 비활성화 하기';
                }

                // Clear result text
                resultElement.textContent = '';
                break;
            }
        }
    });

});
