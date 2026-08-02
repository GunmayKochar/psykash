const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

css = css.replace('.mobile-modal-header {', '.mobile-modal-header {\n    position: relative;\n    z-index: 10;');
css = css.replace('.mobile-modal-grid {', '.mobile-modal-grid {\n    position: relative;\n    z-index: 10;');

fs.writeFileSync('index.css', css, 'utf8');
console.log('CSS updated with z-index for header and grid');
