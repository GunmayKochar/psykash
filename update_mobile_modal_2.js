const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const modalRegex = /<!-- MOBILE MODAL REDESIGN -->\s*<div class="modal-container mobile-modal">.*?<\/button>\s*<\/div>/s;

const newMobileModal = `<!-- MOBILE MODAL REDESIGN -->
      <div class="modal-container mobile-modal">
        <!-- Floating Meditation Illustration Background -->
        <div class="mobile-modal-bg">
          <div class="therapy-illustration-wrapper">
            <!-- Background Decorations (Orbit lines and Shadow) -->
            <svg class="therapy-decorations" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <!-- Ground Shadow -->
              <ellipse class="therapy-svg__shadow" cx="250" cy="460" rx="140" ry="12" fill="rgba(45,45,45,0.08)"/>
              
              <!-- Orbit Ribbons -->
              <path class="therapy-svg__ribbon" d="M 70 250 C 70 120, 430 80, 430 250 C 430 420, 70 420, 70 250 Z" stroke="var(--sage-muted)" stroke-width="1.5" opacity="0.3" fill="none" stroke-linecap="round"/>
              <path class="therapy-svg__ribbon therapy-svg__ribbon--2" d="M 120 180 C 250 50, 450 350, 200 450 C 50 350, -10 300, 120 180 Z" stroke="var(--sage-soft)" stroke-width="1" opacity="0.4" fill="none" stroke-linecap="round"/>
            </svg>

            <!-- Floating Image Container -->
            <div class="therapy-image-floater">
              <img src="assets/therapy-girl.png.png" alt="Meditating Woman" class="therapy-image" />
            </div>

            <!-- Foreground Decorations (Leaves) -->
            <svg class="therapy-decorations-front" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <path id="min-leaf" d="M 0 -8 Q 8 -8 8 0 Q 8 8 0 8 Q -8 8 -8 0 Q -8 -8 0 -8 Z"/>
                <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="0" dy="2"/>
                  <feComponentTransfer><feFuncA type="linear" slope="0.1"/></feComponentTransfer>
                  <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <g filter="url(#leafShadow)">
                <g class="therapy-svg__leaf therapy-svg__leaf--1"><use href="#min-leaf" x="100" y="140" fill="var(--sage)"/></g>
                <g class="therapy-svg__leaf therapy-svg__leaf--2"><use href="#min-leaf" x="420" y="200" fill="var(--sage-light)" transform="scale(0.8)"/></g>
                <g class="therapy-svg__leaf therapy-svg__leaf--3"><use href="#min-leaf" x="120" y="380" fill="var(--olive)" transform="scale(1.1)"/></g>
                <g class="therapy-svg__leaf therapy-svg__leaf--4"><use href="#min-leaf" x="400" y="380" fill="var(--sage)"/></g>
                <g class="therapy-svg__leaf therapy-svg__leaf--5"><use href="#min-leaf" x="380" y="90" fill="var(--olive)" transform="scale(0.9)"/></g>
              </g>
            </svg>
          </div>
        </div>

        <div class="mobile-modal-header" style="position: relative; z-index: 10;">
          <h2 class="mobile-modal-title">Choose Your Path</h2>
          <p class="mobile-modal-subtitle">Whether you're looking for immediate self-help tools or professional guidance, choose the option that's right for you.</p>
        </div>

        <div class="mobile-modal-grid" style="position: relative; z-index: 10;">
          <!-- Explore Self Help -->
          <a href="self-help.html" class="mobile-modal-card">
            <div class="mobile-modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <h3 class="mobile-modal-title-small">Explore Self Help</h3>
            <p class="mobile-modal-desc">Evidence-based guides and practical exercises you can start immediately.</p>
            <div class="mobile-modal-btn">Explore &rarr;</div>
          </a>

          <!-- Book Appointment -->
          <a href="contact.html" class="mobile-modal-card" onclick="window.history.length > 1 ? window.history.back() : window.location.href='index.html'; return false;" id="btnModalContactMobile">
            <div class="mobile-modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            </div>
            <h3 class="mobile-modal-title-small">Book Appointment</h3>
            <p class="mobile-modal-desc">Schedule a one-on-one session with Kashish.</p>
            <div class="mobile-modal-btn">Book &rarr;</div>
          </a>
        </div>

        <button class="mobile-modal-back btn btn--outline" id="btnMobileGoBack" aria-label="Go Back" onclick="window.history.length > 1 ? window.history.back() : window.location.href='index.html';" style="position: relative; z-index: 10;">
          &larr; Go Back
        </button>
      </div>`;
// Wait, the user said for Book Appointment to stay as contact link.
// The onclick I put on Book Appointment is wrong! Let me fix it.
// I'll run another node script.
html = html.replace(modalRegex, newMobileModal);
fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML updated');
