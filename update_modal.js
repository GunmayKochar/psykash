const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const modalRegex = /<div id="getStartedModal".*?<\/div>\s*<\/div>\s*<\/div>/s;

const desktopModal = `    <div id="getStartedModal" class="modal-overlay" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <!-- DESKTOP MODAL -->
      <div class="modal-container desktop-modal">
        <button class="modal-close" id="btnModalClose" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div class="modal-header">
          <h2 id="modalTitle" class="modal-title">How would you like to begin?</h2>
          <p class="modal-subtitle">Whether you're looking for immediate self-help tools or professional guidance, choose the path that's right for you.</p>
        </div>
  
        <div class="modal-grid">
          <!-- Self Help Option -->
          <a href="self-help.html" class="card modal-option-card">
            <div class="modal-option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A5.5 5.5 0 0 1 15 7.5c0 1.33-.47 2.55-1.26 3.5H15a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2"/><path d="M14.5 2A5.5 5.5 0 0 0 9 7.5c0 1.33.47 2.55 1.26 3.5H9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2"/><path d="M8 22v-2a4 4 0 0 1 8 0v2"/></svg>
            </div>
            <h3 class="modal-option-title">Self Help</h3>
            <p class="modal-option-desc">Explore evidence-informed guides, practical exercises, and mental wellness tools at your own pace.</p>
            <span class="btn btn--secondary modal-option-btn">Explore Self Help</span>
          </a>
  
          <!-- Book Appointment Option -->
          <a href="contact.html" class="card modal-option-card" id="btnModalContact">
            <div class="modal-option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            </div>
            <h3 class="modal-option-title">Book an Appointment</h3>
            <p class="modal-option-desc">Connect with Kashish for personalized online therapy and professional guidance.</p>
            <span class="btn btn--secondary modal-option-btn">Book Appointment</span>
          </a>
        </div>
      </div>

      <!-- MOBILE MODAL REDESIGN -->
      <div class="modal-container mobile-modal">
        <div class="mobile-modal-header">
          <h2 class="mobile-modal-title">Choose Your Path</h2>
          <p class="mobile-modal-subtitle">Whether you're looking for immediate self-help tools or professional guidance, choose the option that's right for you.</p>
        </div>

        <div class="mobile-modal-grid">
          <!-- Explore Self Help -->
          <a href="self-help.html" class="mobile-modal-card">
            <div class="mobile-modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A5.5 5.5 0 0 1 15 7.5c0 1.33-.47 2.55-1.26 3.5H15a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2"/><path d="M14.5 2A5.5 5.5 0 0 0 9 7.5c0 1.33.47 2.55 1.26 3.5H9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2"/><path d="M8 22v-2a4 4 0 0 1 8 0v2"/></svg>
            </div>
            <h3 class="mobile-modal-title-small">Explore Self Help</h3>
            <p class="mobile-modal-desc">Evidence-based guides and practical exercises you can start immediately.</p>
            <div class="mobile-modal-btn">Explore &rarr;</div>
          </a>

          <!-- Book Appointment -->
          <a href="contact.html" class="mobile-modal-card">
            <div class="mobile-modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            </div>
            <h3 class="mobile-modal-title-small">Book Appointment</h3>
            <p class="mobile-modal-desc">Schedule a one-on-one session with Kashish.</p>
            <div class="mobile-modal-btn">Book &rarr;</div>
          </a>
        </div>

        <button class="mobile-modal-back btn btn--outline" id="btnMobileGoBack" aria-label="Go Back">
          &larr; Go Back
        </button>
      </div>
    </div>`;

html = html.replace(modalRegex, desktopModal);
fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML updated');
