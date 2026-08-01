const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const startIndex = css.indexOf('/* ============================================================') !== -1 ? css.lastIndexOf('/* ============================================================\n   GET STARTED MODAL SPLIT STRUCTURE') !== -1 ? css.lastIndexOf('/* ============================================================\n   GET STARTED MODAL SPLIT STRUCTURE') : css.lastIndexOf('/* ============================================================\r\n   GET STARTED MODAL SPLIT STRUCTURE') : -1;

if (startIndex === -1) {
    console.log("Could not find start");
    process.exit(1);
}

const newCss = `/* ============================================================
   GET STARTED MODAL SPLIT STRUCTURE
   ============================================================ */
.mobile-modal {
  display: none !important;
}
.desktop-modal {
  display: block;
}

@media (max-width: 768px) {
  /* Swap visibility */
  .desktop-modal {
    display: none !important;
  }
  
  /* Make overlay semi-transparent dark with blur */
  #getStartedModal.modal-overlay {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(0, 0, 0, 0.45) !important;
    backdrop-filter: blur(6px) !important;
    -webkit-backdrop-filter: blur(6px) !important;
    padding: var(--sp-4) !important;
    overflow: hidden !important;
    height: 100vh !important;
    height: 100dvh !important;
  }
  
  /* Centered glassmorphism modal box (Apple Health / Notion style) */
  .mobile-modal {
    display: flex !important;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 320px;
    height: auto;
    min-height: auto;
    padding: 24px 20px;
    background-color: rgba(255, 255, 255, 0.75) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 12px 40px rgba(0,0,0,0.1);
    border-radius: 28px !important;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    transform: scale(0.95) !important;
    margin: 0 !important;
    opacity: 0;
    transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease;
    z-index: 10;
  }
  
  #getStartedModal.open .mobile-modal {
    transform: scale(1) !important;
    opacity: 1;
  }

  .mobile-modal-header {
    margin: 0 auto 20px auto;
    width: 100%;
    position: relative;
    z-index: 10;
  }

  .mobile-modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: var(--font-heading);
    color: var(--charcoal);
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }

  .mobile-modal-subtitle {
    font-size: 0.9rem;
    color: var(--color-text-sub);
    line-height: 1.4;
    margin: 0 auto;
  }

  /* Native App Style Buttons */
  .mobile-app-btn-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-bottom: 0;
    position: relative;
    z-index: 10;
  }

  .mobile-app-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 16px 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 18px;
    color: var(--charcoal);
    font-size: 1.05rem;
    font-weight: 600;
    font-family: var(--font-body);
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: all 150ms ease;
    cursor: pointer;
  }

  .mobile-app-btn--back {
    background-color: transparent;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: none;
    color: var(--color-text-sub);
  }

  .mobile-app-btn:active {
    transform: scale(0.97);
    background-color: var(--sage-soft);
    border-color: var(--sage);
  }

  .mobile-app-btn-icon {
    font-size: 1.2rem;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
  }

  /* Decorative Watermark Background */
  .mobile-modal-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.6);
    width: 100%;
    max-width: 500px;
    opacity: 0.12;
    filter: blur(4px);
    z-index: 1;
    pointer-events: none;
    display: block;
  }
}
`;

css = css.substring(0, startIndex).trimRight() + '\n\n' + newCss;
fs.writeFileSync('index.css', css, 'utf8');
console.log('index.css totally rewritten');
