const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

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

// --- Event Bubbling Demo (stopPropagation) ---

// document.addEventListener('click', () => {
//     log('document clicked!');
//     log('');
// });

outer.addEventListener('click', (event) => {
    log('Outer div clicked!');
    if (stopPropagationCheckbox.checked) {
        event.stopPropagation();
        log('--- Event propagation stopped ---');
        log('');
    } else {
        log('');
    }
});

middle.addEventListener('click', (event) => {
    log('Middle div clicked!');
    if (stopPropagationCheckbox.checked) {
        event.stopPropagation();
        log('--- Event propagation stopped ---');
        log('');
    }
});

inner.addEventListener('click', (event) => {
    log('Inner div clicked! 1');
    if (stopPropagationCheckbox.checked) {
        event.stopPropagation();
        log('--- Event propagation stopped ---');
        log('');
    }
});

inner.addEventListener('click', (event) => {
    log('Inner div clicked! 2');
    if (stopPropagationCheckbox.checked) {
        event.stopPropagation();
        log('--- Event propagation stopped ---');
        log('');
    }
});
