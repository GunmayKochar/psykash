const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Extract the .mobile-modal-bg block
const bgMatch = html.match(/(<div class="mobile-modal-bg">[\s\S]*?<\/div>\s*<\/div>\s*)(<div class="mobile-modal-header")/);
if (bgMatch) {
    const bgContent = bgMatch[1];
    
    // Remove it from the current position
    html = html.replace(bgContent, '');
    
    // Insert it after the Go Back button
    html = html.replace(/(<\/button>\s*)(<\/div>\s*<\/div>\s*<\/main>)/, '$1\n        ' + bgContent + '$2');
    
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('HTML updated: moved illustration to bottom.');
} else {
    console.log('Regex did not match.');
}
