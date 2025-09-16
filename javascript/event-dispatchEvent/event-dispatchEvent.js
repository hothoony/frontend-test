const openModalBtn = document.getElementById('open-modal-btn');
const modal = document.getElementById('modal');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');
const modalInput = document.getElementById('modal-input');
const resultSpan = document.getElementById('result');

// --- Modal Logic ---

function openModal() {
    modal.classList.add('visible');
    modalInput.value = ''; // Clear previous input
    modalInput.focus();
}

function closeModal() {
    modal.classList.remove('visible');
}

function handleConfirm() {
    const inputValue = modalInput.value.trim();
    if (inputValue) {
        // Create a custom event with the input value
        const submitEvent = new CustomEvent('modal-submit', {
            detail: { value: inputValue }
        });

        // Dispatch the event on the document
        document.dispatchEvent(submitEvent);

        closeModal();
    } else {
        alert('Please enter a value.');
    }
}

// --- Event Listeners ---

openModalBtn.addEventListener('click', openModal);

cancelBtn.addEventListener('click', closeModal);

confirmBtn.addEventListener('click', handleConfirm);

// Listen for the custom event on the document
document.addEventListener('modal-submit', (event) => {
    console.log('Custom event received:', event);
    resultSpan.textContent = event.detail.value;
});

// Close modal if user clicks outside the content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});