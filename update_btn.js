const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /onclick="window\.history\.length > 1 \? window\.history\.back\(\) : window\.location\.href='index\.html';"/,
    `onclick="document.getElementById('getStartedModal').classList.remove('open'); document.body.style.overflow='';"`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Go Back button logic updated to close modal.');
