const fs = require('fs');
let main = fs.readFileSync('main.js', 'utf8');

// Check if we already bound btnMobileGoBack
if (!main.includes('btnMobileGoBack.addEventListener')) {
    main = main.replace(
        "btnModalClose.addEventListener('click', closeModal);",
        "btnModalClose.addEventListener('click', closeModal);\n      \n      const btnMobileGoBack = document.getElementById('btnMobileGoBack');\n      if (btnMobileGoBack) {\n        btnMobileGoBack.addEventListener('click', closeModal);\n      }"
    );
    fs.writeFileSync('main.js', main, 'utf8');
    console.log('main.js updated with btnMobileGoBack click listener');
}
