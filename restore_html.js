const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const modalStart = html.indexOf('<!-- MOBILE MODAL REDESIGN -->');
const modalEnd = html.indexOf('<!--', modalStart + 10);
let modalHtml = html.substring(modalStart, modalEnd);

const newButtonsHtml = `
          <div class="mobile-modal-grid" style="position: relative; z-index: 10;">
            <!-- Explore Self Help -->
            <a href="self-help.html" class="mobile-modal-card">
              <div class="mobile-modal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              </div>
              <h3 class="mobile-modal-title-small">Explore Self Help</h3>
              <p class="mobile-modal-desc">Evidence-based guides and practical exercises you can start immediately.</p>
              <div class="mobile-modal-btn">Explore &rarr;</div>
            </a>
  
            <!-- Book Appointment -->
            <a href="contact.html" class="mobile-modal-card">
              <div class="mobile-modal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              </div>
              <h3 class="mobile-modal-title-small">Book Appointment</h3>
              <p class="mobile-modal-desc">Schedule a one-on-one session with Kashish.</p>
              <div class="mobile-modal-btn">Book &rarr;</div>
            </a>
          </div>
          
          <!-- Go Back -->
          <button class="mobile-modal-back btn btn--outline" id="btnMobileGoBack" aria-label="Go Back">
            &larr; Go Back
          </button>
`;

modalHtml = modalHtml.replace(/<div class="mobile-app-btn-group"[\s\S]*?<\/div>/, newButtonsHtml);

html = html.substring(0, modalStart) + modalHtml + html.substring(modalEnd);
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated to restore full cards');
