import { initModal, showModal } from './modal.js';

const openModalBtn = document.getElementById('open-modal-btn');
const resultSpan = document.getElementById('result');

const modalElement = document.getElementById('user-settings-modal');

// Add event listener to open the modal
openModalBtn.addEventListener('click', () => {
    showModal(modalElement, {
        onConfirm: (result) => {
            console.log('Modal confirmed with values:', result);
            // Format the result object for display
            let resultHTML = '<ul>';
            for (const [key, value] of Object.entries(result)) {
                const displayValue = Array.isArray(value) && value.length === 0 ? 'none' : 
                                     Array.isArray(value) ? value.join(', ') : 
                                     value;
                resultHTML += `<li><strong>${key}:</strong> ${displayValue}</li>`;
            }
            resultHTML += '</ul>';
            resultSpan.innerHTML = resultHTML;
        },
        onCancel: () => {
            resultSpan.textContent = 'Modal was canceled.';
            console.log('Modal was canceled or closed.');
        }
    });
});
