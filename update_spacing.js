const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// Update mobile-app-btn-group gap to 20px
css = css.replace(
  /\.mobile-app-btn-group {\s*display: flex;\s*flex-direction: column;\s*gap: 12px;/,
  '.mobile-app-btn-group {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;'
);

// Update mobile-app-btn padding to 18px 20px (from 16px 20px)
css = css.replace(
  /\.mobile-app-btn {\s*display: flex;\s*align-items: center;\s*justify-content: flex-start;\s*width: 100%;\s*padding: 16px 20px;/,
  '.mobile-app-btn {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    width: 100%;\n    padding: 18px 20px;'
);

// Add margin-top to the Go Back button for visual separation
css = css.replace(
  /\.mobile-app-btn--back {\s*background-color: transparent;\s*border: 1px solid rgba\(0,0,0,0\.08\);\s*box-shadow: none;\s*color: var\(--color-text-sub\);\s*}/,
  '.mobile-app-btn--back {\n    background-color: transparent;\n    border: 1px solid rgba(0,0,0,0.08);\n    box-shadow: none;\n    color: var(--color-text-sub);\n    margin-top: 4px; /* Creates approx 24px space from previous card (20px gap + 4px margin) */\n    justify-content: center;\n  }'
);

fs.writeFileSync('index.css', css, 'utf8');
console.log('index.css updated for spacing and padding refinements');
