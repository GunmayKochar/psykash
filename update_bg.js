const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// The replacement CSS for the affected parts
const bgRegex = /\/\* Illustration flowing naturally at the bottom \*\/[\s\S]*?\.mobile-modal-bg\s*{[^}]*}/;
const newBgCss = `/* Illustration as a background watermark */
  .mobile-modal-bg {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.2);
    width: 100%;
    max-width: 400px;
    opacity: 0.2;
    z-index: 1;
    pointer-events: none;
  }`;
css = css.replace(bgRegex, newBgCss);

const headerRegex = /\.mobile-modal-header\s*{([^}]*)}/;
css = css.replace(headerRegex, (match, inner) => {
    return `.mobile-modal-header {${inner}    position: relative;\n    z-index: 10;\n}`;
});

const gridRegex = /\.mobile-modal-grid\s*{([^}]*)}/;
css = css.replace(gridRegex, (match, inner) => {
    return `.mobile-modal-grid {${inner}    position: relative;\n    z-index: 10;\n}`;
});

fs.writeFileSync('index.css', css, 'utf8');
console.log('CSS updated for absolute background illustration');
