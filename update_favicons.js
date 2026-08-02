const fs = require('fs');
const path = require('path');

const faviconBlock = `
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="manifest" href="/site.webmanifest">
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match existing favicon/manifest links to remove them
    // Matches <link rel="icon" ...>, <link rel="apple-touch-icon" ...>, <link rel="shortcut icon" ...>, <link rel="manifest" ...>
    const linkRegex = /<link[^>]*rel=["']?(?:icon|apple-touch-icon|shortcut icon|manifest)["']?[^>]*>/gi;
    
    // Remove existing
    content = content.replace(linkRegex, '');
    
    // Insert new block before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', faviconBlock + '</head>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`Warning: No </head> found in ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

walkDir('.');
