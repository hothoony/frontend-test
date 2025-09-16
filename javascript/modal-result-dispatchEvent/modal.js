export class Modal {
    constructor(modalElement, fieldNames) {
        if (!modalElement) {
            throw new Error('Modal element not found!');
        }
        this.modalElement = modalElement;
        this.fieldNames = fieldNames; // Array of field name strings
        this.resolvePromise = null;

        this._addEventListeners();
    }

    _addEventListeners() {
        this.modalElement.querySelector('.modal__button--confirm').addEventListener('click', () => this._handleConfirm());
        this.modalElement.querySelector('.modal__button--cancel').addEventListener('click', () => this._handleCancel());
        this.modalElement.addEventListener('click', (event) => {
            if (event.target === this.modalElement) {
                this._handleCancel();
            }
        });
    }

    _handleConfirm() {
        const results = {};
        this.fieldNames.forEach(name => {
            const elements = this.modalElement.querySelectorAll(`[name=${name}]`);
            if (!elements.length) return;

            const firstElement = elements[0];
            const type = firstElement.type;

            switch (type) {
                case 'text':
                case 'select-one':
                    results[name] = firstElement.value;
                    break;
                case 'radio':
                    const checkedRadio = this.modalElement.querySelector(`[name=${name}]:checked`);
                    results[name] = checkedRadio ? checkedRadio.value : null;
                    break;
                case 'checkbox':
                    results[name] = Array.from(this.modalElement.querySelectorAll(`[name=${name}]:checked`)).map(cb => cb.value);
                    break;
            }
        });

        if (this.resolvePromise) {
            this.resolvePromise(results);
        }
        this.hide();
    }

    _handleCancel() {
        if (this.resolvePromise) {
            this.resolvePromise(null);
        }
        this.hide();
    }

    show() {
        this.modalElement.classList.add('modal--visible');
        const firstInput = this.modalElement.querySelector('input, select');
        if (firstInput) firstInput.focus();

        return new Promise((resolve) => {
            this.resolvePromise = resolve;
        });
    }

    hide() {
        this.modalElement.classList.remove('modal--visible');
        this.resolvePromise = null;
    }
}
