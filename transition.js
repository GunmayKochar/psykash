const fs = require('fs');
let main = fs.readFileSync('main.js', 'utf8');

// 1. Add page-slide-in when skipping splash screen
main = main.replace(
  /\} else \{\s*\/\/ Remove immediately without playing\s*splashScreen\.remove\(\);\s*setTimeout\(\(\) => document\.dispatchEvent\(new CustomEvent\('psykash-splash-complete'\)\), 50\);\s*\}/,
  `} else {
      // Remove immediately without playing
      splashScreen.remove();
      setTimeout(() => document.dispatchEvent(new CustomEvent('psykash-splash-complete')), 50);
      
      // Page Transition Slide-In (Desktop)
      if (window.innerWidth > 768 && navType !== 'back_forward') {
        document.documentElement.classList.add('is-animating');
        document.body.classList.add('page-slide-in');
        setTimeout(() => {
          document.documentElement.classList.remove('is-animating');
          document.body.classList.remove('page-slide-in');
        }, 450);
      }
    }`
);

// 2. Also handle if no splash screen exists
main = main.replace(
  /\} else \{\s*\/\/ If no splash screen exists on this page\s*setTimeout\(\(\) => document\.dispatchEvent\(new CustomEvent\('psykash-splash-complete'\)\), 50\);\s*\}/,
  `} else {
    // If no splash screen exists on this page
    setTimeout(() => document.dispatchEvent(new CustomEvent('psykash-splash-complete')), 50);
    
    // Page Transition Slide-In (Desktop)
    const isInternalNavFallback = sessionStorage.getItem('psykash_internal_nav') === 'true';
    if (window.innerWidth > 768 && isInternalNavFallback) {
      document.documentElement.classList.add('is-animating');
      document.body.classList.add('page-slide-in');
      setTimeout(() => {
        document.documentElement.classList.remove('is-animating');
        document.body.classList.remove('page-slide-in');
      }, 450);
    }
  }`
);

// 3. Update the global click listener to intercept navigation and trigger slide-out
main = main.replace(
  /sessionStorage\.setItem\('psykash_internal_nav', 'true'\);\s*\}/,
  `sessionStorage.setItem('psykash_internal_nav', 'true');
             
             // Page Transition Slide-Out (Desktop)
             if (window.innerWidth > 768 && (!link.target || link.target !== '_blank')) {
               // Ensure it's not a hash link on the same page
               if (!link.hash || link.pathname !== window.location.pathname) {
                 e.preventDefault();
                 document.documentElement.classList.add('is-animating');
                 document.body.classList.add('page-slide-out');
                 setTimeout(() => {
                   window.location.href = link.href;
                 }, 350);
               }
             }
          }`
);

fs.writeFileSync('main.js', main, 'utf8');
console.log('Updated main.js with page transition logic');

let css = fs.readFileSync('index.css', 'utf8');
const transitionCss = `
/* ============================================================
   PAGE TRANSITIONS (Desktop)
   ============================================================ */
@media (min-width: 769px) {
  html.is-animating, html.is-animating body {
    overflow-x: hidden !important;
  }
  body.page-slide-out {
    animation: slideOutLeft 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  body.page-slide-in {
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  @keyframes slideOutLeft {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(-80px); opacity: 0; }
  }
  @keyframes slideInRight {
    0% { transform: translateX(80px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
}
`;

if (!css.includes('PAGE TRANSITIONS (Desktop)')) {
  css += '\n' + transitionCss;
  fs.writeFileSync('index.css', css, 'utf8');
  console.log('Updated index.css with page transition styles');
} else {
  console.log('CSS already updated');
}
