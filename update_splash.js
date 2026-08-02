const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// Replace the mobile splash screen CSS
const regex = /\.splash-screen\s*{\s*flex-direction:\s*column\s*!important;\s*justify-content:\s*center\s*!important;\s*align-items:\s*center\s*!important;\s*}/;
const newCss = `.splash-screen {
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      height: 100vh !important;
      height: 100dvh !important;
      z-index: 9999999 !important;
    }`;

if (regex.test(css)) {
    css = css.replace(regex, newCss);
    fs.writeFileSync('index.css', css, 'utf8');
    console.log('index.css updated');
} else {
    console.log('Regex did not match in index.css');
}

let main = fs.readFileSync('main.js', 'utf8');
main = main.replace(
    "document.documentElement.style.overflow = 'hidden';",
    "document.documentElement.style.overflow = 'hidden';\n        document.body.style.overflow = 'hidden';"
);
main = main.replace(
    "document.documentElement.style.overflow = '';",
    "document.documentElement.style.overflow = '';\n          document.body.style.overflow = '';"
);
fs.writeFileSync('main.js', main, 'utf8');
console.log('main.js updated');

