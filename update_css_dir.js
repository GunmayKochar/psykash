const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// Replace the old page transitions
const newCss = `
  main.page-slide-out-left, body.page-slide-out-left {
    will-change: transform, opacity;
    animation: slideOutLeft 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  main.page-slide-in-right, body.page-slide-in-right {
    will-change: transform, opacity;
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  main.page-slide-out-right, body.page-slide-out-right {
    will-change: transform, opacity;
    animation: slideOutRight 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  main.page-slide-in-left, body.page-slide-in-left {
    will-change: transform, opacity;
    animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  @keyframes slideOutLeft {
    0% { transform: translate3d(0, 0, 0); opacity: 1; }
    100% { transform: translate3d(-60px, 0, 0); opacity: 0; }
  }
  @keyframes slideInRight {
    0% { transform: translate3d(60px, 0, 0); opacity: 0; }
    100% { transform: translate3d(0, 0, 0); opacity: 1; }
  }
  @keyframes slideOutRight {
    0% { transform: translate3d(0, 0, 0); opacity: 1; }
    100% { transform: translate3d(60px, 0, 0); opacity: 0; }
  }
  @keyframes slideInLeft {
    0% { transform: translate3d(-60px, 0, 0); opacity: 0; }
    100% { transform: translate3d(0, 0, 0); opacity: 1; }
  }
`;

// Remove the old blocks if they exist
css = css.replace(/main\.page-slide-out,\s*body\.page-slide-out\s*\{[\s\S]*?\}/g, '');
css = css.replace(/main\.page-slide-in,\s*body\.page-slide-in\s*\{[\s\S]*?\}/g, '');
css = css.replace(/@keyframes slideOutLeft\s*\{[\s\S]*?\}/g, '');
css = css.replace(/@keyframes slideInRight\s*\{[\s\S]*?\}/g, '');

// Insert new CSS right after overflow-y: scroll !important; }
css = css.replace(/overflow-y: scroll !important;\s*\}/, "overflow-y: scroll !important;\n  }\n" + newCss);

fs.writeFileSync('index.css', css, 'utf8');
console.log('index.css updated');
