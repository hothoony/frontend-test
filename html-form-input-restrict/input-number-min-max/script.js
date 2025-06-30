(function() {
    'use strict';
    
    // Get elements
    const input = document.getElementById('numberInput');
    const errorMessage = document.getElementById('errorMessage');
    
    // Get configuration from data attributes
    const config = {
        min: input.hasAttribute('data-min') ? parseInt(input.getAttribute('data-min'), 10) : null,
        max: input.hasAttribute('data-max') ? parseInt(input.getAttribute('data-max'), 10) : null,
        maxLength: input.hasAttribute('data-maxLen') ? parseInt(input.getAttribute('data-maxLen'), 10) : null
    };
    
    // Previous valid value for fallback
    let previousValue = '';
    
    // Utility functions
    function isNumeric(value) {
        return /^\d+$/.test(value);
    }
    
    function isInRange(value) {
        const num = parseInt(value, 10);
        
        // If no min/max restrictions, always return true
        if (config.min === null && config.max === null) {
            return true;
        }
        
        // Check min restriction
        if (config.min !== null && num < config.min) {
            return false;
        }
        
        // Check max restriction
        if (config.max !== null && num > config.max) {
            return false;
        }
        
        return true;
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        input.classList.add('invalid');
    }
    
    function hideError() {
        errorMessage.classList.remove('show');
        input.classList.remove('invalid');
    }
    
    function validateAndFormat(value) {
        // Remove any non-numeric characters
        let cleaned = value.replace(/[^\d]/g, '');
        
        // Check if empty
        if (cleaned === '') {
            hideError();
            return '';
        }
        
        // Check if numeric
        if (!isNumeric(cleaned)) {
            showError('Only numbers are allowed');
            return previousValue;
        }
        
        // Check length restriction (only if data-maxLen is set)
        if (config.maxLength !== null && cleaned.length > config.maxLength) {
            showError(`Maximum ${config.maxLength} digits allowed`);
            return previousValue;
        }
        
        // Check range restriction (only if data-min or data-max is set)
        if (!isInRange(cleaned)) {
            let rangeMessage = 'Number must be ';
            if (config.min !== null && config.max !== null) {
                rangeMessage += `between ${config.min} and ${config.max}`;
            } else if (config.min !== null) {
                rangeMessage += `at least ${config.min}`;
            } else if (config.max !== null) {
                rangeMessage += `at most ${config.max}`;
            }
            showError(rangeMessage);
            return previousValue;
        }
        
        // Valid input
        hideError();
        return cleaned;
    }
    
    // Event handlers
    function handleInput(event) {
        const currentValue = event.target.value;
        const validatedValue = validateAndFormat(currentValue);
        
        // Update input value if different
        if (validatedValue !== currentValue) {
            event.target.value = validatedValue;
        }
        
        // Update previous value if valid
        if (validatedValue === currentValue) {
            previousValue = validatedValue;
        }
    }
    
    function handleKeydown(event) {
        // Allow: backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (event.keyCode === 65 && event.ctrlKey === true) ||
            (event.keyCode === 67 && event.ctrlKey === true) ||
            (event.keyCode === 86 && event.ctrlKey === true) ||
            (event.keyCode === 88 && event.ctrlKey === true) ||
            // Allow home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        
        // Ensure that it is a number and stop the keypress
        if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
            (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
    
    function handlePaste(event) {
        event.preventDefault();
        
        // Get pasted data
        let pastedData = '';
        if (event.clipboardData && event.clipboardData.getData) {
            pastedData = event.clipboardData.getData('text/plain');
        } else if (window.clipboardData && window.clipboardData.getData) {
            pastedData = window.clipboardData.getData('Text');
        }
        
        // Validate pasted data
        const validatedData = validateAndFormat(pastedData);
        if (validatedData !== '') {
            // Insert at cursor position
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const currentValue = input.value;
            const newValue = currentValue.substring(0, start) + validatedData + currentValue.substring(end);
            
            // Check if the new value would be valid
            const finalValidation = validateAndFormat(newValue);
            if (finalValidation === newValue) {
                input.value = newValue;
                previousValue = newValue;
                
                // Set cursor position
                setTimeout(function() {
                    input.setSelectionRange(start + validatedData.length, start + validatedData.length);
                }, 0);
            }
        }
    }
    
    function handleFocus() {
        // Select all text on focus for easy replacement
        input.select();
    }
    
    // Add event listeners
    if (input.addEventListener) {
        input.addEventListener('input', handleInput, false);
        input.addEventListener('keydown', handleKeydown, false);
        input.addEventListener('paste', handlePaste, false);
        input.addEventListener('focus', handleFocus, false);
    } else {
        // Fallback for older browsers
        input.attachEvent('onpropertychange', function() {
            if (event.propertyName === 'value') {
                handleInput(event);
            }
        });
        input.attachEvent('onkeydown', handleKeydown);
        input.attachEvent('onpaste', handlePaste);
        input.attachEvent('onfocus', handleFocus);
    }
    
    // Prevent drag and drop
    input.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
    
    input.addEventListener('drop', function(event) {
        event.preventDefault();
    });
    
})(); 