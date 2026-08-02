const fs = require('fs');

let main = fs.readFileSync('main.js', 'utf8');
main = main.replace(/document\.body\.classList\.add\('page-slide-in'\);/g, "const mainEl = document.querySelector('main'); if(mainEl) mainEl.classList.add('page-slide-in'); else document.body.classList.add('page-slide-in');");
main = main.replace(/document\.body\.classList\.remove\('page-slide-in'\);/g, "const mainEl = document.querySelector('main'); if(mainEl) mainEl.classList.remove('page-slide-in'); else document.body.classList.remove('page-slide-in');");
main = main.replace(/document\.body\.classList\.add\('page-slide-out'\);/g, "const mainEl = document.querySelector('main'); if(mainEl) mainEl.classList.add('page-slide-out'); else document.body.classList.add('page-slide-out');");

fs.writeFileSync('main.js', main, 'utf8');
console.log('main.js updated');

let css = fs.readFileSync('index.css', 'utf8');
css = css.replace(/body\.page-slide-out/g, "main.page-slide-out, body.page-slide-out");
css = css.replace(/body\.page-slide-in/g, "main.page-slide-in, body.page-slide-in");
css = css.replace(/transform: translateX\(([^)]+)\)/g, "transform: translate3d($1, 0, 0)");

if (!css.includes('will-change: transform')) {
  css = css.replace(/main\.page-slide-out,\s*body\.page-slide-out\s*\{\s*animation/g, "main.page-slide-out, body.page-slide-out {\n    will-change: transform, opacity;\n    animation");
  css = css.replace(/main\.page-slide-in,\s*body\.page-slide-in\s*\{\s*animation/g, "main.page-slide-in, body.page-slide-in {\n    will-change: transform, opacity;\n    animation");
}
fs.writeFileSync('index.css', css, 'utf8');
console.log('index.css updated');
