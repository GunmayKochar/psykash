const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const regex = /\/\* ============================================================\r?\n\s*6\. MOBILE NAV OVERLAY[\s\S]*?\/\* ============================================================\r?\n\s*10\.2 SECTION: HERO/;
const newCss = `/* ============================================================
   6. MOBILE NAV OVERLAY (PREMIUM REDESIGN)
   ============================================================ */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 380px;
  z-index: calc(var(--z-nav) + 1); /* Above navbar so close button is on top */
  background-color: rgba(255, 255, 255, 0.85); /* Soft white glass */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-left: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-nav.open {
  transform: translateX(0);
}

/* Scrim behind mobile nav */
.mobile-nav-scrim {
  position: fixed;
  inset: 0;
  z-index: var(--z-nav); /* Sits exactly at navbar level to cover it, but nav drawer is higher */
  background-color: rgba(0, 0, 0, 0.3); /* Stronger dark overlay */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease;
}

.mobile-nav-scrim.open {
  opacity: 1;
  pointer-events: all;
}

/* Header inside drawer */
.mobile-nav__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(env(safe-area-inset-top) + var(--sp-4)) var(--sp-6) var(--sp-4) var(--sp-6);
}

.mobile-nav__logo {
  height: 36px;
  width: auto;
}

.mobile-nav__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.05);
  background: rgba(255, 255, 255, 0.6);
  color: var(--charcoal);
  cursor: pointer;
  transition: all 300ms ease;
  transform: rotate(0deg);
}

.mobile-nav.open .mobile-nav__close {
  transform: rotate(90deg);
}

.mobile-nav__close:active {
  background: var(--sage-soft);
  transform: rotate(90deg) scale(0.9);
}

.mobile-nav__close svg {
  width: 20px;
  height: 20px;
}

.mobile-nav__divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent);
  margin: 0 var(--sp-6);
}

/* Internal Layout */
.mobile-nav__content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: var(--sp-6);
  justify-content: space-between; /* Pushes social to bottom, centers links */
}

.mobile-nav__links {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  margin-top: auto;
  margin-bottom: auto; /* Vertically balances links */
}

/* Navigation Links (Elegant Cards) */
.mobile-nav__link {
  display: flex;
  align-items: center;
  font-family: var(--font-heading); /* Serif */
  font-size: 1.4rem; /* Not too big */
  font-weight: 500;
  color: var(--charcoal);
  padding: 16px 20px;
  border-radius: 16px;
  background-color: transparent;
  transition: all 200ms ease;
  text-decoration: none;
  opacity: 0;
  transform: translateX(16px);
}

.mobile-nav.open .mobile-nav__link {
  opacity: 1;
  transform: translateX(0);
}

.mobile-nav.open .mobile-nav__link:nth-child(1) { transition-delay: 50ms; }
.mobile-nav.open .mobile-nav__link:nth-child(2) { transition-delay: 100ms; }
.mobile-nav.open .mobile-nav__link:nth-child(3) { transition-delay: 150ms; }
.mobile-nav.open .mobile-nav__link:nth-child(4) { transition-delay: 200ms; }
.mobile-nav.open .mobile-nav__link:nth-child(5) { transition-delay: 250ms; }

/* Active State */
.mobile-nav__link.active {
  background-color: var(--sage-soft);
  color: var(--olive-dark);
}

/* Hover/Tap State */
.mobile-nav__link:active {
  background-color: rgba(0,0,0,0.04);
  transform: scale(0.98);
}
.mobile-nav__link.active:active {
  background-color: var(--sage);
}

.mobile-nav__icon {
  width: 22px;
  height: 22px;
  margin-right: 16px;
  opacity: 0.8;
  color: inherit;
}

/* Bottom Social Section */
.mobile-nav__social {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-3);
  padding-bottom: var(--sp-4);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 400ms ease 300ms, transform 400ms ease 300ms;
}

.mobile-nav.open .mobile-nav__social {
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav__icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
}

.mobile-nav__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0,0,0,0.05);
  color: var(--charcoal);
  transition: all 200ms ease;
}

.mobile-nav__icon-btn:active {
  transform: scale(0.92);
  background-color: var(--sage-soft);
  color: var(--olive-dark);
}

.mobile-nav__icon-btn svg {
  width: 20px;
  height: 20px;
}

.mobile-nav__social-text {
  font-size: 0.85rem;
  color: var(--color-text-sub);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}


/* ============================================================
   10.2 SECTION: HERO`;

if (regex.test(css)) {
    css = css.replace(regex, newCss);
    fs.writeFileSync('index.css', css, 'utf8');
    console.log('index.css updated');
} else {
    console.log('Could not find regex in index.css');
}
