// Character counter
document.getElementById('input').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').textContent = charCount;
});

// Case conversion functions
function convertCase(type) {
    const input = document.getElementById('input').value;
    let output = '';
    
    switch(type) {
        case 'upper':
            output = input.toUpperCase();
            break;
            
        case 'lower':
            output = input.toLowerCase();
            break;
            
        case 'title':
            output = input.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            break;
            
        case 'sentence':
            output = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function(c) {
                return c.toUpperCase();
            });
            break;
            
        case 'camel':
            output = input.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
            break;
            
        case 'pascal':
            output = input.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word) {
                return word.toUpperCase();
            }).replace(/\s+/g, '');
            break;
            
        case 'snake':
            output = input.toLowerCase().replace(/\s+/g, '_');
            break;
            
        case 'kebab':
            output = input.toLowerCase().replace(/\s+/g, '-');
            break;
    }
    
    document.getElementById('output').value = output;
}

// Copy to clipboard function
function copyToClipboard() {
    const output = document.getElementById('output');
    
    if (output.value === '') {
        showNotification('Nothing to copy!', 'error');
        return;
    }
    
    output.select();
    output.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy', 'error');
    }
}

// Clear all function
function clearAll() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
    document.getElementById('charCount').textContent = '0';
}

// Show notification
function showNotification(message, type) {
    // Remove existing notification if any
    const existing = document.querySelector('.copy-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}