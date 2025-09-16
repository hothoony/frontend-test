export function createModal(modalElement, fieldNames) {
    if (!modalElement) {
        throw new Error('Modal element not found!');
    }

    let onConfirmCallback = null;
    let onCancelCallback = null;

    const _handleConfirm = () => {
        const results = {};
        fieldNames.forEach(name => {
            const elements = modalElement.querySelectorAll(`[name=${name}]`);
            if (!elements.length) return;

            const firstElement = elements[0];
            const type = firstElement.type;

            switch (type) {
                case 'text':
                case 'select-one':
                    results[name] = firstElement.value;
                    break;
                case 'radio':
                    const checkedRadio = modalElement.querySelector(`[name=${name}]:checked`);
                    results[name] = checkedRadio ? checkedRadio.value : null;
                    break;
                case 'checkbox':
                    results[name] = Array.from(modalElement.querySelectorAll(`[name=${name}]:checked`)).map(cb => cb.value);
                    break;
            }
        });

        if (onConfirmCallback) {
            onConfirmCallback(results);
        }
        hide();
    };

    const _handleCancel = () => {
        if (onCancelCallback) {
            onCancelCallback();
        }
        hide();
    };

    const show = (callbacks = {}) => {
        onConfirmCallback = callbacks.onConfirm;
        onCancelCallback = callbacks.onCancel;

        modalElement.classList.add('modal--visible');
        const firstInput = modalElement.querySelector('input, select');
        if (firstInput) firstInput.focus();
    };

    const hide = () => {
        modalElement.classList.remove('modal--visible');
        onConfirmCallback = null;
        onCancelCallback = null;
    };

    const _addEventListeners = () => {
        modalElement.querySelector('.modal__button--confirm').addEventListener('click', _handleConfirm);
        modalElement.querySelector('.modal__button--cancel').addEventListener('click', _handleCancel);
        modalElement.addEventListener('click', (event) => {
            if (event.target === modalElement) {
                _handleCancel();
            }
        });
    };

    _addEventListeners();

    return {
        show,
        hide
    };
}
