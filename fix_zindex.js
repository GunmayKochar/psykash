const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// Replace z-index of .mobile-nav
css = css.replace(/z-index:\s*calc\(var\(--z-nav\)\s*\+\s*1\);[\s\S]*?\/\* Above navbar so close button is on top \*\//, 'z-index: 999999 !important;');

// Replace z-index of .mobile-nav-scrim
css = css.replace(/z-index:\s*var\(--z-nav\);\s*\/\* Sits exactly at navbar level to cover it, but nav drawer is higher \*\//, 'z-index: 999998 !important;');

fs.writeFileSync('index.css', css, 'utf8');
console.log('index.css updated with proper z-indexes for mobile nav');
