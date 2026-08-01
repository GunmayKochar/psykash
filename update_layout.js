const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const regexOverlay = /#getStartedModal\.modal-overlay\s*{[\s\S]*?height:\s*100dvh\s*!important;\s*}/;
const matchOverlay = css.match(regexOverlay);

if (matchOverlay) {
    let overlayCss = matchOverlay[0];
    overlayCss = overlayCss.replace('align-items: center !important;', 'align-items: center !important;\n    flex-direction: column !important;\n    justify-content: flex-start !important;');
    overlayCss = overlayCss.replace('justify-content: center !important;', '');
    overlayCss = overlayCss.replace(/padding:\s*var\(--sp-4\)\s*!important;/, 'padding: calc(var(--nav-height, 70px) + 24px) var(--sp-4) var(--sp-4) var(--sp-4) !important;');
    css = css.replace(regexOverlay, overlayCss);
}

const regexModal = /\.mobile-modal\s*{[\s\S]*?z-index:\s*10;\s*}/;
const matchModal = css.match(regexModal);

if (matchModal) {
    let modalCss = matchModal[0];
    modalCss = modalCss.replace(/margin:\s*0\s*!important;/, 'margin: auto !important;');
    modalCss = modalCss.replace(/max-height:\s*calc\(100vh\s*-\s*48px\);/, 'max-height: calc(100vh - var(--nav-height, 70px) - 48px);');
    modalCss = modalCss.replace(/max-height:\s*calc\(100svh\s*-\s*max\(48px,\s*env\(safe-area-inset-top\)\s*\*\s*2\)\);/, 'max-height: calc(100svh - var(--nav-height, 70px) - max(48px, env(safe-area-inset-top) * 2));');
    
    // In case the previous max-height replacements didn't work (if they were slightly different), do a fallback replace
    if (!modalCss.includes('var(--nav-height')) {
        modalCss = modalCss.replace(/max-height:[^;]+;/g, 'max-height: calc(100svh - var(--nav-height, 70px) - max(48px, env(safe-area-inset-top) * 2));');
    }
    
    css = css.replace(regexModal, modalCss);
}

fs.writeFileSync('index.css', css, 'utf8');
console.log('index.css updated with safe centering layout');
