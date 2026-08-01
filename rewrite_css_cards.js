const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const startIndex = css.indexOf('/* ============================================================') !== -1 ? css.lastIndexOf('/* ============================================================\n   GET STARTED MODAL SPLIT STRUCTURE') !== -1 ? css.lastIndexOf('/* ============================================================\n   GET STARTED MODAL SPLIT STRUCTURE') : css.lastIndexOf('/* ============================================================\r\n   GET STARTED MODAL SPLIT STRUCTURE') : -1;

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
  
  /* Centered glassmorphism modal box */
  .mobile-modal {
    display: flex !important;
    flex-direction: column;
    align-items: center;
    width: 92%;
    max-width: 380px; /* 10-15% larger */
    height: auto;
    min-height: auto;
    padding: 32px 24px;
    background-color: rgba(255, 255, 255, 0.7) !important;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 16px 50px rgba(0,0,0,0.15);
    border-radius: 32px !important;
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
    margin: 0 auto 28px auto;
    width: 100%;
    position: relative;
    z-index: 10;
  }

  .mobile-modal-title {
    font-size: 1.6rem;
    font-weight: 700;
    font-family: var(--font-heading);
    color: var(--charcoal);
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }

  .mobile-modal-subtitle {
    font-size: 0.95rem;
    color: var(--color-text-sub);
    line-height: 1.4;
    margin: 0 auto;
  }

  /* Full Content Cards */
  .mobile-modal-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 26px; /* 24-28px gap */
    width: 100%;
    margin-bottom: 0;
    position: relative;
    z-index: 10;
  }

  .mobile-modal-card {
    background-color: rgba(255, 255, 255, 0.85); /* Glass card */
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 24px;
    padding: 24px; /* Generous padding */
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
    transition: transform 150ms ease, background-color 150ms ease;
  }

  .mobile-modal-card:active {
    transform: scale(0.97) !important;
    background-color: rgba(227, 235, 217, 0.9);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .mobile-modal-icon {
    color: var(--olive);
    margin-bottom: 16px; /* Open spacing */
  }

  .mobile-modal-title-small {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 10px;
    line-height: 1.2;
    font-family: var(--font-heading);
  }

  .mobile-modal-desc {
    font-size: 0.95rem;
    color: var(--color-text-sub);
    line-height: 1.5;
    margin-bottom: 20px;
    flex-grow: 1;
  }

  .mobile-modal-btn {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--olive);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 200ms ease;
  }

  .mobile-modal-back {
    /* Guaranteed visibility, no opacity tricks */
    opacity: 1 !important;
    display: inline-flex !important;
    margin: 36px auto 0 auto !important; /* 36px top margin */
    
    /* Pill styling */
    border-radius: 9999px !important;
    background-color: transparent !important;
    border: 1.5px solid rgba(0,0,0,0.1) !important;
    color: var(--color-text-sub) !important;
    padding: 14px 32px !important;
    font-weight: 500;
    font-size: 1rem;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 200ms ease;
    z-index: 10;
    text-decoration: none;
    cursor: pointer;
  }
  
  .mobile-modal-back:active {
    background-color: rgba(0,0,0,0.04) !important;
    transform: scale(0.96);
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
console.log('index.css successfully rewritten with new card styling');
