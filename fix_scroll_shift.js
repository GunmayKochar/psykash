const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

css = css.replace(/html\.is-animating, html\.is-animating body \{\s*overflow-x: hidden !important;\s*\}/, "html.is-animating, html.is-animating body {\n    overflow-x: hidden !important;\n    overflow-y: scroll !important;\n  }");

fs.writeFileSync('index.css', css, 'utf8');
console.log('index.css updated');
