const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regexFix = /<a href="contact.html" class="mobile-modal-card" onclick=".*?" id="btnModalContactMobile">/;
html = html.replace(regexFix, '<a href="contact.html" class="mobile-modal-card">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed Contact Button');
