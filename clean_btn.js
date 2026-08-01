const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /onclick="document\.getElementById\('getStartedModal'\)\.classList\.remove\('open'\); document\.body\.style\.overflow='';"/,
    ''
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Inline onclick removed.');
