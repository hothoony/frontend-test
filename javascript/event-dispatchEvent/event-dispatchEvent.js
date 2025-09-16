import { Modal } from './modal.js';

const openModalBtn = document.getElementById('open-modal-btn');
const resultSpan = document.getElementById('result');

// 1. Get the modal element from the DOM
const modalElement = document.getElementById('user-settings-modal');

// 2. Define the names of the fields to be collected
const fieldNames = ['username', 'features', 'plan', 'country'];

// 3. Create a modal instance by passing the element and field names
const complexModal = new Modal(modalElement, fieldNames);

// 4. Add event listener to open the modal and process the results
openModalBtn.addEventListener('click', async () => {
    const result = await complexModal.show();

    if (result) {
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
    } else {
        resultSpan.textContent = 'Modal was canceled.';
        console.log('Modal was canceled or closed.');
    }
});