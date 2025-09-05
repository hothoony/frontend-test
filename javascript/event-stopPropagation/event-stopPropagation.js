const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

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
    log('Inner div clicked!');
    if (stopPropagationCheckbox.checked) {
        event.stopPropagation();
        log('--- Event propagation stopped ---');
        log('');
    }
});

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
