const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');

// Remove the old direct event listener
content = content.replace(/if\s*\(mobileCloseBtn\)\s*\{\s*mobileCloseBtn\.addEventListener\('click',\s*closeMenu\);\s*\}/, '');

// Add the event delegation listener right after mobileScrim listener
const delegationCode = `
    document.addEventListener('click', (e) => {
      if (e.target.closest('#mobileCloseBtn')) {
        closeMenu();
      }
    });
`;

content = content.replace(/mobileScrim\.addEventListener\('click', closeMenu\);/, "mobileScrim.addEventListener('click', closeMenu);\n" + delegationCode);

fs.writeFileSync('main.js', content, 'utf8');
console.log('main.js updated with event delegation for mobileCloseBtn');
