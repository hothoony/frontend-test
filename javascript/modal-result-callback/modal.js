const modalStates = new WeakMap();

const fieldNames = ['username', 'features', 'plan', 'country'];

function _getFormValues(modalElement, fieldNames) {
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
    return results;
}

export function initModal(modalElement) {
    if (!modalElement) {
        throw new Error('Modal element not found!');
    }

    const handleConfirm = () => {
        const state = modalStates.get(modalElement);
        if (state && state.onConfirm) {
            const values = _getFormValues(modalElement, fieldNames);
            state.onConfirm(values);
        }
        hideModal(modalElement);
    };

    const handleCancel = () => {
        const state = modalStates.get(modalElement);
        if (state && state.onCancel) {
            state.onCancel();
        }
        hideModal(modalElement);
    };

    modalElement.querySelector('.modal__button--confirm').addEventListener('click', handleConfirm);
    modalElement.querySelector('.modal__button--cancel').addEventListener('click', handleCancel);
    modalElement.addEventListener('click', (event) => {
        if (event.target === modalElement) {
            handleCancel();
        }
    });
}

export function showModal(modalElement, callbacks = {}) {
    if (!modalElement) return;

    initModal(modalElement);

    modalStates.set(modalElement, callbacks);

    modalElement.classList.add('modal--visible');
    const firstInput = modalElement.querySelector('input, select');
    if (firstInput) firstInput.focus();
}

export function hideModal(modalElement) {
    if (!modalElement) return;

    modalElement.classList.remove('modal--visible');
    modalStates.delete(modalElement);
}