const fs = require('fs');
let js = fs.readFileSync('main.js', 'utf8');

if (!js.includes('const mobileCloseBtn')) {
    js = js.replace(/const hamburgerBtn = document\.getElementById\('hamburgerBtn'\);/, "const hamburgerBtn = document.getElementById('hamburgerBtn');\n    const mobileCloseBtn = document.getElementById('mobileCloseBtn');");
    
    js = js.replace(/mobileScrim\.addEventListener\('click', closeMenu\);/, "mobileScrim.addEventListener('click', closeMenu);\n    if (mobileCloseBtn) { mobileCloseBtn.addEventListener('click', closeMenu); }");
    
    fs.writeFileSync('main.js', js, 'utf8');
    console.log('main.js updated to support mobileCloseBtn');
} else {
    console.log('main.js already updated');
}

let css = fs.readFileSync('index.css', 'utf8');
if (!css.includes('.navbar__hamburger.open {')) {
    css = css.replace(/\.navbar__hamburger:hover {/, `.navbar__hamburger.open {\n    opacity: 0 !important;\n    pointer-events: none !important;\n  }\n\n  .navbar__hamburger:hover {`);
    fs.writeFileSync('index.css', css, 'utf8');
    console.log('index.css updated to hide hamburger when open');
} else {
    console.log('index.css already updated');
}
