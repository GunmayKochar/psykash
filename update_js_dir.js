const fs = require('fs');
let main = fs.readFileSync('main.js', 'utf8');

// Slide-out
main = main.replace(
  /const mainEl = document\.querySelector\('main'\); if\(mainEl\) mainEl\.classList\.add\('page-slide-out'\); else document\.body\.classList\.add\('page-slide-out'\);/g,
  `function getIdx(p) {
                     if (p.includes('about')) return 1;
                     if (p.includes('self-help') || p.includes('/resources/')) return 2;
                     if (p.includes('faq')) return 3;
                     if (p.includes('contact')) return 4;
                     return 0; // home
                   }
                   const currentIdx = getIdx(window.location.pathname);
                   const targetIdx = getIdx(link.pathname);
                   const dir = targetIdx < currentIdx ? 'left' : 'right';
                   sessionStorage.setItem('psykash_nav_dir', dir);
                   
                   const outCls = dir === 'left' ? 'page-slide-out-right' : 'page-slide-out-left';
                   const mainEl = document.querySelector('main');
                   if(mainEl) mainEl.classList.add(outCls); else document.body.classList.add(outCls);`
);

// Slide-in block 1
main = main.replace(
  /const mainEl = document\.querySelector\('main'\); if\(mainEl\) mainEl\.classList\.add\('page-slide-in'\); else document\.body\.classList\.add\('page-slide-in'\);\s*setTimeout\(\(\) => \{\s*document\.documentElement\.classList\.remove\('is-animating'\);\s*const mainEl = document\.querySelector\('main'\); if\(mainEl\) mainEl\.classList\.remove\('page-slide-in'\); else document\.body\.classList\.remove\('page-slide-in'\);\s*\}, 450\);/g,
  `const dir = sessionStorage.getItem('psykash_nav_dir') || 'right';
        const inCls = dir === 'left' ? 'page-slide-in-left' : 'page-slide-in-right';
        const mainEl = document.querySelector('main');
        if(mainEl) mainEl.classList.add(inCls); else document.body.classList.add(inCls);
        setTimeout(() => {
          document.documentElement.classList.remove('is-animating');
          const mainEl = document.querySelector('main');
          if(mainEl) mainEl.classList.remove(inCls); else document.body.classList.remove(inCls);
        }, 450);`
);

fs.writeFileSync('main.js', main, 'utf8');
console.log('main.js updated with directional logic');
