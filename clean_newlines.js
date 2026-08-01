const fs = require('fs');

['index.html', 'contact.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('\\n')) {
        content = content.replace(/\\n/g, '\n');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned literal \\n in ${file}`);
    }
});
