const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// Update .mobile-modal inside the mobile media query
const modalRegex = /\.mobile-modal {[\s\S]*?z-index: 10;\s*}/;
const match = css.match(modalRegex);

if (match) {
    let modalCss = match[0];
    
    // Replace height/min-height with proper max-height and overflow
    modalCss = modalCss.replace(
        /height: auto;\s*min-height: auto;/,
        'height: auto;\n    max-height: calc(100vh - 48px);\n    max-height: calc(100svh - max(48px, env(safe-area-inset-top) * 2));\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;'
    );
    
    css = css.replace(modalRegex, modalCss);
    fs.writeFileSync('index.css', css, 'utf8');
    console.log('index.css updated with dynamic viewport scrolling logic');
} else {
    console.log('Could not find .mobile-modal in CSS');
}

