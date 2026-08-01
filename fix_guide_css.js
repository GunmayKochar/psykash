const fs = require('fs');
let css = fs.readFileSync('guide.css', 'utf8');

const mobileOverride = `
/* ============================================================
   MOBILE OVERRIDES (Read More Pages)
   ============================================================ */
@media (max-width: 768px) {
  /* 1. Container padding to prevent cutting off */
  .guide-container {
    padding-left: 24px !important;
    padding-right: 24px !important;
    padding-top: var(--sp-6) !important;
    padding-bottom: var(--sp-8) !important;
    box-sizing: border-box !important;
    width: 100% !important;
    overflow-x: hidden !important;
  }
  
  /* 2. Resize Main Title & Subtitle */
  .guide-title {
    font-size: var(--text-3xl) !important;
    line-height: var(--leading-tight) !important;
    padding: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .guide-subtitle {
    font-size: var(--text-base) !important;
    line-height: var(--leading-normal) !important;
    padding: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  /* Resize Section Headings */
  .guide-section h2, 
  .guide-section h2.icon-heading {
    font-size: var(--text-2xl) !important;
    line-height: var(--leading-tight) !important;
    margin-bottom: var(--sp-3) !important;
    padding: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .guide-section h3, 
  .guide-section > div:not(.guide-challenge) > h3.icon-heading {
    font-size: var(--text-lg) !important;
    line-height: var(--leading-snug) !important;
    padding: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  /* 3. Paragraph spacing and readability */
  .guide-section p {
    font-size: 1.05rem !important;
    line-height: 1.7 !important;
    margin-bottom: var(--sp-4) !important;
    padding: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  /* 4. Align lists and icons */
  .guide-section ul, 
  .guide-section ol {
    padding-left: 20px !important;
    padding-right: 0 !important;
    margin-bottom: var(--sp-4) !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .guide-section li {
    font-size: 1.05rem !important;
    line-height: 1.7 !important;
    margin-bottom: 14px !important;
  }
  
  /* Fix content blocks (challenges, disclaimers, etc) */
  .guide-challenge,
  .guide-disclaimer,
  .guide-reminder {
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
    padding: var(--sp-4) !important;
  }

  .guide-challenge h3 {
    font-size: var(--text-xl) !important;
    margin-bottom: var(--sp-2) !important;
  }
  .guide-challenge p {
    font-size: var(--text-base) !important;
    margin-bottom: 0 !important;
  }
  
  .guide-reminder blockquote {
    font-size: var(--text-2xl) !important;
    line-height: var(--leading-tight) !important;
  }
}
`;

if (!css.includes('MOBILE OVERRIDES (Read More Pages)')) {
    css += '\n' + mobileOverride;
    fs.writeFileSync('guide.css', css, 'utf8');
    console.log('guide.css updated with mobile layout fixes');
} else {
    console.log('guide.css already contains the mobile fixes');
}
