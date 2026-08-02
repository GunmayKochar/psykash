const fs = require('fs');
let main = fs.readFileSync('main.js', 'utf8');

main = main.replace(
  /if \(window\.innerWidth > 768 && navType !== 'back_forward'\) \{/g,
  "if (window.innerWidth > 768 && navType !== 'back_forward') { window.scrollTo(0, 0);"
);

main = main.replace(
  /if \(window\.innerWidth > 768 && isInternalNavFallback\) \{/g,
  "if (window.innerWidth > 768 && isInternalNavFallback) { window.scrollTo(0, 0);"
);

fs.writeFileSync('main.js', main, 'utf8');
console.log('main.js updated with scroll reset');
