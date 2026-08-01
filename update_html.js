const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const modalStart = html.indexOf('<!-- MOBILE MODAL REDESIGN -->');
const modalEnd = html.indexOf('<!--', modalStart + 10);
let modalHtml = html.substring(modalStart, modalEnd);

// Replace subtitle
modalHtml = modalHtml.replace(
  /<p class="mobile-modal-subtitle">[\s\S]*?<\/p>/,
  '<p class="mobile-modal-subtitle">What would you like to do?</p>'
);

// Replace the grid and buttons with the new clean button stack
const newButtonsHtml = `
          <div class="mobile-app-btn-group" style="position: relative; z-index: 10;">
            <!-- Explore Self Help -->
            <a href="self-help.html" class="mobile-app-btn">
              <span class="mobile-app-btn-icon">🌿</span>
              Explore Self Help
            </a>
  
            <!-- Book Appointment -->
            <a href="contact.html" class="mobile-app-btn">
              <span class="mobile-app-btn-icon">📅</span>
              Book Appointment
            </a>

            <!-- Go Back -->
            <button class="mobile-app-btn mobile-app-btn--back" id="btnMobileGoBack" aria-label="Go Back">
              <span class="mobile-app-btn-icon">←</span>
              Go Back
            </button>
          </div>
`;

// Replace everything from <div class="mobile-modal-grid" ... to the closing button tag of mobile-modal-back
modalHtml = modalHtml.replace(/<div class="mobile-modal-grid"[\s\S]*?<\/button>/, newButtonsHtml);

html = html.substring(0, modalStart) + modalHtml + html.substring(modalEnd);
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated with clean buttons');
