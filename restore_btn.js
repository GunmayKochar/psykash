const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

const btnCss = `
/* ============================================================
   BUTTONS (Restored)
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-base);
  padding: 14px 32px;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  outline: none;
  line-height: 1;
  text-align: center;
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--white);
  box-shadow: 0 4px 14px rgba(168, 184, 154, 0.4);
}

.btn--primary:hover, .btn--primary:focus-visible {
  background-color: var(--color-accent-alt);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(127, 142, 114, 0.45);
}

.btn--primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(127, 142, 114, 0.35);
}
`;

if (!css.includes('.btn--primary')) {
    css = css.replace('/* ============================================================', btnCss + '\n/* ============================================================');
    fs.writeFileSync('index.css', css, 'utf8');
    console.log('index.css updated with restored .btn classes');
} else {
    console.log('.btn class already exists');
}
