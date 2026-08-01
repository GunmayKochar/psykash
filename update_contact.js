const fs = require('fs');

// 1. Update contact.html
let html = fs.readFileSync('contact.html', 'utf8');

// Insert Instagram helper
html = html.replace(
  /<div class="contact-detail"([^>]*)>@psykash_25<\/div>/g,
  '<div class="contact-detail"$1>@psykash_25</div>\n              <p class="mobile-tap-helper">Tap to open</p>'
);

// Insert LinkedIn helper
html = html.replace(
  /<div class="contact-detail"([^>]*)>Kashish Maan<\/div>/g,
  '<div class="contact-detail"$1>Kashish Maan</div>\n              <p class="mobile-tap-helper">Tap to open</p>'
);

// Insert Email helper
html = html.replace(
  /<div class="contact-detail"([^>]*)>psykash25@gmail\.com<\/div>/g,
  '<div class="contact-detail"$1>psykash25@gmail.com</div>\n              <p class="mobile-tap-helper">Tap to compose</p>'
);

fs.writeFileSync('contact.html', html, 'utf8');
console.log('Updated contact.html');

// 2. Update index.css
let css = fs.readFileSync('index.css', 'utf8');

const helperCss = `
/* ============================================================
   MOBILE TAP HELPER (Contact Page)
   ============================================================ */
.mobile-tap-helper {
  display: none; /* Hidden on desktop */
}
@media (max-width: 768px) {
  .mobile-tap-helper {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    color: var(--charcoal-soft);
    text-align: center;
    font-weight: 400;
  }
}
`;

if (!css.includes('.mobile-tap-helper')) {
  css += '\n' + helperCss;
  fs.writeFileSync('index.css', css, 'utf8');
  console.log('Updated index.css');
} else {
  console.log('index.css already updated');
}
