const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Move mobile-modal-bg outside of mobile-modal
const bgRegex = /(<div class="mobile-modal-bg">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*)(<\/div>\s*<\/div>\s*<!-- \?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?\?)/;

// More reliable regex: extract mobile-modal-bg and insert it right before the closing </div> of getStartedModal
const startStr = '<div class="mobile-modal-bg">';
const endStr = '</button>';

let startIndex = html.indexOf(startStr);
let endIndex = html.indexOf('</div>', html.indexOf('</div>', html.indexOf('</div>', startIndex) + 1) + 1) + 6;

if (startIndex !== -1) {
    let bgContent = html.substring(startIndex, endIndex);
    html = html.replace(bgContent, '');
    
    // find end of mobile-modal
    html = html.replace(/(<\/div>\s*)(<\/div>\s*<!-- )/, `$1    ${bgContent}\n$2`);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('HTML updated');
} else {
    console.log('Could not find mobile-modal-bg');
}

