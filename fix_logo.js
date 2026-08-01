const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

if (!css.includes('.navbar:has(.navbar__hamburger.open) .navbar__logo')) {
    css += `\n/* Hide main logo when mobile drawer is open to prevent duplicates */\n.navbar:has(.navbar__hamburger.open) .navbar__logo {\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n`;
    fs.writeFileSync('index.css', css, 'utf8');
    console.log('index.css updated to hide duplicate logo');
} else {
    console.log('index.css already hides duplicate logo');
}

let navbar = fs.readFileSync('navbar.js', 'utf8');
if (navbar.includes('src="assets/images/logo.png"')) {
    navbar = navbar.replace('src="assets/images/logo.png"', 'src="${prefix}assets/images/logo.png"');
    fs.writeFileSync('navbar.js', navbar, 'utf8');
    console.log('navbar.js updated with prefix for logo');
} else {
    console.log('navbar.js already updated');
}
