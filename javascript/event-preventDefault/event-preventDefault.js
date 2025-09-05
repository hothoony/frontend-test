
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');

const stopPropagationCheckbox = document.getElementById('stop-propagation-checkbox');
const logElement = document.getElementById('log');
const clearLogButton = document.getElementById('clear-log');

function log(message) {
    logElement.textContent += message + '\n';
    logElement.scrollTop = logElement.scrollHeight;
}

function clearLog() {
    logElement.textContent = '';
}

clearLogButton.addEventListener('click', clearLog);

// --- Default Action Demo (preventDefault) ---

link1.addEventListener('click', (event) => {
    log('Link1 clicked!');
    log('--- Link1 default action NOT prevented ---');
    log('');
});
link2.addEventListener('click', (event) => {
    log('Link2 clicked!');
    event.preventDefault();
    log('--- Link2 default action prevented ---');
    log('');
});
