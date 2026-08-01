const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const startIndex = css.indexOf('/* ============================================================');
// We need to find the specific GET STARTED MODAL SPLIT STRUCTURE block
const splitIndex = css.indexOf('/* ============================================================\r\n   GET STARTED MODAL SPLIT STRUCTURE');
if (splitIndex === -1) {
    const splitIndex2 = css.indexOf('/* ============================================================\n   GET STARTED MODAL SPLIT STRUCTURE');
    if (splitIndex2 !== -1) {
        css = css.substring(0, splitIndex2);
    }
} else {
    css = css.substring(0, splitIndex);
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
  
  /* Make overlay fullscreen and scrolling */
  #getStartedModal.modal-overlay {
    display: block !important;
    background: var(--ivory) !important;
    padding: 0 !important;
    backdrop-filter: none !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    height: 100vh !important;
    height: 100dvh !important;
  }
  
  /* Perfectly natural block layout for full screen scrolling */
  .mobile-modal {
    display: block !important;
    width: 100%;
    min-height: 100%;
    height: auto;
    padding: var(--sp-6) var(--sp-4) var(--sp-8) var(--sp-4);
    background-color: var(--ivory);
    box-sizing: border-box;
    text-align: center;
    position: relative;
    transform: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
  }

  .mobile-modal-header {
    margin: 0 auto var(--sp-6) auto;
    width: 100%;
    max-width: 500px;
    opacity: 0;
  }
  
  #getStartedModal.open .mobile-modal-header {
    animation: mobileFadeIn 500ms ease forwards;
  }

  .mobile-modal-title {
    font-size: var(--text-2xl);
    font-family: var(--font-heading);
    color: var(--charcoal);
    margin-bottom: var(--sp-2);
  }

  .mobile-modal-subtitle {
    font-size: var(--text-sm);
    color: var(--color-text-sub);
    line-height: 1.5;
    max-width: 320px;
    margin: 0 auto;
  }

  /* 2 columns grid for side-by-side cards */
  .mobile-modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-3);
    width: 100%;
    max-width: 500px;
    margin: 0 auto var(--sp-6) auto;
  }

  .mobile-modal-card {
    background-color: rgba(227, 235, 217, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 24px;
    padding: var(--sp-4) var(--sp-3);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    text-decoration: none;
    opacity: 0;
    transform: translateY(20px);
  }
  
  #getStartedModal.open .mobile-modal-card:nth-child(1) {
    animation: fadeUpModalCard 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards 100ms;
  }
  #getStartedModal.open .mobile-modal-card:nth-child(2) {
    animation: fadeUpModalCard 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards 200ms;
  }

  @keyframes fadeUpModalCard {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-modal-card:active {
    transform: scale(0.96) !important;
    box-shadow: none;
    transition: transform 100ms ease;
  }

  .mobile-modal-icon {
    color: var(--olive);
    margin-bottom: var(--sp-3);
  }

  .mobile-modal-title-small {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: var(--sp-1);
    line-height: 1.2;
    font-family: var(--font-body);
  }

  .mobile-modal-desc {
    font-size: var(--text-xs);
    color: var(--color-text-sub);
    line-height: 1.4;
    margin-bottom: var(--sp-4);
    flex-grow: 1;
  }

  .mobile-modal-btn {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--olive);
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 200ms ease;
  }

  .mobile-modal-back {
    /* Guaranteed visibility, no opacity tricks */
    opacity: 1 !important;
    display: inline-flex !important;
    margin: 0 auto var(--sp-6) auto !important;
    
    /* Pill styling */
    border-radius: 9999px !important;
    background-color: transparent !important;
    border: 1.5px solid var(--olive) !important;
    color: var(--olive) !important;
    padding: 12px 28px !important;
    font-weight: 500;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 200ms ease;
    z-index: 10;
    text-decoration: none;
    cursor: pointer;
  }
  
  .mobile-modal-back:active {
    background-color: var(--sage-soft) !important;
    transform: scale(0.96);
  }

  @keyframes mobileFadeIn {
    to { opacity: 1; }
  }

  /* Illustration flowing naturally at the bottom */
  .mobile-modal-bg {
    position: relative;
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
    opacity: 1;
    display: block;
  }
}
`;

css = css.trimRight() + '\n\n' + newCss;
fs.writeFileSync('index.css', css, 'utf8');
console.log('CSS cleanly replaced.');
