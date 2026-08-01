/* ============================================================
   PSYKASH — navbar.js
   Shared Navbar Component
   ============================================================ */
(function() {
  'use strict';

  const isSubdir = window.location.pathname.includes('/resources/');
  const prefix = isSubdir ? '../' : '';
  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  // Determine active states
  let isHomeActive = false;
  let isAboutActive = false;
  let isSelfHelpActive = false;
  let isFaqActive = false;

  if (filename === 'faq.html') {
    isFaqActive = true;
  } else if (filename === 'about.html') {
    isAboutActive = true;
  } else if (
    filename === 'self-help.html' ||
    filename.startsWith('guide-') ||
    filename.startsWith('tool-') ||
    [
      'grounding-5-4-3-2-1.html',
      'box-breathing.html',
      'stop-technique.html',
      'progressive-muscle-relaxation.html',
      'panic-attack-coping-card.html'
    ].includes(filename) ||
    isSubdir
  ) {
    isSelfHelpActive = true;
  } else if (filename === 'index.html' || filename === '') {
    isHomeActive = true;
  }

  // Define URLs
  const homeUrl = (filename === 'index.html' || filename === '') ? '#home' : `${prefix}index.html#home`;
  const aboutUrl = `${prefix}about.html`;
  const contactUrl = `${prefix}contact.html`;

  const navbarHtml = `
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar__inner">
      <!-- Logo (left) -->
      <a href="${(filename === 'index.html' || filename === '') ? 'javascript:void(0);' : prefix + 'index.html'}" class="navbar__logo" aria-label="Psykash Home"><img src="${prefix}assets/images/logo.png" alt="Psykash Online Therapy Logo" style="height: var(--nav-logo); width: auto; transition: height var(--dur-base) var(--ease-out);" /></a>

      <!-- Center navigation links (desktop) -->
      <ul class="navbar__links" id="navLinks">
        <li><a href="${homeUrl}"      class="navbar__link${isHomeActive ? ' active' : ''}">Home</a></li>
        <li><a href="${aboutUrl}"     class="navbar__link${isAboutActive ? ' active' : ''}">About</a></li>
        <li class="navbar__dropdown" id="selfHelpDropdown">
          <a href="${prefix}self-help.html" class="navbar__link${isSelfHelpActive ? ' active' : ''}">Self Help</a>
          <div class="mega-menu">
            <div class="mega-menu__grid">
              <a href="${prefix}self-help.html" class="mega-card">
                <i data-lucide="search" class="mega-icon guide-icon"></i> Search
              </a>
              <a href="${prefix}self-help.html#explore-topics" class="mega-card">
                <i data-lucide="compass" class="mega-icon guide-icon"></i> Explore Topics
              </a>
              <a href="${prefix}self-help.html#quick-toolkit" class="mega-card">
                <i data-lucide="zap" class="mega-icon guide-icon"></i> Quick Toolkit
              </a>
              <a href="${prefix}self-help.html#digital-wellbeing" class="mega-card">
                <i data-lucide="smartphone" class="mega-icon guide-icon"></i> Digital Wellbeing
              </a>
            </div>
          </div>
        </li>
        <li><a href="${prefix}faq.html"       class="navbar__link${isFaqActive ? ' active' : ''}">FAQ</a></li>
        <li><a href="${contactUrl}"   class="navbar__link">Contact</a></li>
      </ul>

      <!-- Right icons (desktop) -->
      <div class="navbar__icons" id="navIcons">
        <!-- Instagram -->
        <a href="https://www.instagram.com/psykash_25?utm_source=qr&igsh=YXE3Y3NjMjZpOW1q" class="navbar__icon-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/in/kashish-maan-65b053427?utm_source=share_via&utm_content=profile&utm_medium=member_android" class="navbar__icon-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <!-- Email -->
        <a href="mailto:psykash25@gmail.com" onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=psykash25@gmail.com', '_blank', 'noopener,noreferrer'); return false;" class="navbar__icon-btn" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="3" />
            <polyline points="22,4 12,13 2,4" />
          </svg>
        </a>
      </div>

      <!-- Hamburger (mobile) -->
      <button class="navbar__hamburger" id="hamburgerBtn" aria-label="Toggle menu" aria-expanded="false">
        <div class="navbar__hamburger-lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

    </div>
  </nav>

  <!-- Mobile Nav (slide-in drawer) -->
  <div class="mobile-nav-scrim" id="mobileScrim"></div>

  <aside class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
    <div class="mobile-nav__header">
      <img src="assets/images/logo.png" alt="PsyKash Logo" class="mobile-nav__logo" />
      <button class="mobile-nav__close" id="mobileCloseBtn" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <div class="mobile-nav__divider"></div>
    
    <div class="mobile-nav__content">
      <div class="mobile-nav__links">
        <a href="${homeUrl}" class="mobile-nav__link${isHomeActive ? ' active' : ''}">
          <svg class="mobile-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Home
        </a>
        <a href="${aboutUrl}" class="mobile-nav__link${isAboutActive ? ' active' : ''}">
          <svg class="mobile-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          About
        </a>
        <a href="${prefix}self-help.html" class="mobile-nav__link${isSelfHelpActive ? ' active' : ''}">
          <svg class="mobile-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          Self Help
        </a>
        <a href="${prefix}faq.html" class="mobile-nav__link${isFaqActive ? ' active' : ''}">
          <svg class="mobile-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          FAQ
        </a>
        <a href="${contactUrl}" class="mobile-nav__link">
          <svg class="mobile-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Contact
        </a>
      </div>
  
      <div class="mobile-nav__social">
        <div class="mobile-nav__icons">
          <!-- Instagram -->
          <a href="https://instagram.com/psykash_25" class="mobile-nav__icon-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/kashish-maan-65b053427" class="mobile-nav__icon-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <!-- Email -->
          <a href="mailto:psykash25@gmail.com" class="mobile-nav__icon-btn" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <polyline points="22,4 12,13 2,4" />
            </svg>
          </a>
        </div>
        <p class="mobile-nav__social-text">Follow PsyKash</p>
      </div>
    </div>
  </aside>
  `;

  const container = document.getElementById('nav-container');
  if (container) {
    container.innerHTML = navbarHtml;
  }
})();
