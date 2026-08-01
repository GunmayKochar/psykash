const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const alignCss = `
/* ============================================================
   DESKTOP ALIGNMENT FIX (Contact Page)
   ============================================================ */
@media (min-width: 769px) {
  .contact-card {
    height: 100%;
  }
  .contact-desc {
    flex-grow: 1;
  }
}
`;

if (!css.includes('DESKTOP ALIGNMENT FIX (Contact Page)')) {
  css += '\n' + alignCss;
  fs.writeFileSync('index.css', css, 'utf8');
  console.log('Updated index.css with desktop alignment fix');
} else {
  console.log('Fix already applied');
}
