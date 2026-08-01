const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const fixCss = `
/* Hide meditation woman from desktop splash screen */
@media (min-width: 769px) {
  #splash-screen .therapy-image-floater,
  #splash-screen .therapy-svg__shadow {
    display: none !important;
  }
}
`;

if (!css.includes('Hide meditation woman from desktop splash screen')) {
    css += '\n' + fixCss;
    fs.writeFileSync('index.css', css, 'utf8');
    console.log('index.css updated with splash screen desktop fix');
} else {
    console.log('Fix already applied');
}
